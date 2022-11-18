# Microservicio de Mailing

## Casos de uso

### CU: Crear template de email
**Descripción CU:**
- Este CU se utiliza para que los microservicios externos que consumen este microservicio, puedan crear un nuevo template que contiene la configuración inicial del mail (connection, subject) y también el cuerpo del mail (html)

**Flujo normal:**
- Los campos `moduleName`, `templateName`, `subject`, `html` y `connection` no pueden ir vacios o no definidos
- Validar que la combinacion de `moduleName`+`templateName` no exista en la base de datos anteriormente
- Se guarda el template con la data deseada y retorna el template creado

**Flujos alternativos:**
- Combinacion de `moduleName`+ `templateName` ya se encuentra asociada a una entrada en la base de datos
- Se devuelve un mensaje de error que informa que la combinación de `moduleName`+`templateName` ya se encuentran asociados a una entrada en la base de datos

**Interfaz REST**
`POST: /v1/template`
*Headers*
Authorization: Bearer token
*Response*
`200 OK` si se crea el Template
```json
{
	"moduleName": "orders",
	"templateName": "created",
	"subject": "Order Created",
	"html": "<h2>Hola {{name}}</h2>. <p>Se ha creado una nueva orden bajo el número :<b>{{orderNumber}}</b</p>",
	"connection":{
	    "from":"sells@ecommerce.com",
	    "host":"smtp.mailtrap.io",
	    "port":2525,
	    "auth": {
	        "user": "241user142",
	        "pass": "241password142"
	    }
	  }
	"deletedAt": null
}
```

### CU: Obtener templates de un módulo específico
**Descripción CU:**
- Este CU se utiliza para que los microservicios externos que consumen este microservicio puedan obtener una colección de templates creados anteriormente, relacionado a un módulo en particular. No se permite traer todos los templates, ya que en la mayoría de los casos, nos interesa conocer qué templates han sido creados para el módulo (área del negocio) en el que estamos.

**Flujo normal:**
- Buscar y devolver los templates que coinciden con `moduleName` ingresado. Si no existe ningún template creado con este `moduleName` devuelve una colección vacía
- En la respuesta, no se devuelven los campos `user` y `pass` del `connection`

**Interfaz REST**
`GET: /v1/templates?moduleName={moduleName}`
*Headers*
Authorization: Bearer token
*Response*
`200 OK` independientemente de que la busqueda resulte nula o no
```json
{
	[
		{
			"moduleName": "orders",
			"templateName": "created",
			"subject": "Order Created",
			"html": "<h2>Hola {{name}}</h2>. <p>Se ha creado una nueva orden bajo el número: <b>{{orderNumber}}</b</p>",
			"connection":{
			    "from":"sells@ecommerce.com",
			    "host":"smtp.mailtrap.io",
			    "port":2525,
			  },
			"deletedAt": null
		},
		{
			"moduleName": "orders",
			"templateName": "rejected",
			"subject": "Order Rejected",
			"html": "<h2>Hola {{name}}</h2>. <p>Se ha rechazado la orden número: {{orderNumber} bajo el motivo: {{reason}}</p>",
			"connection":{
			    "from":"sells@ecommerce.com",
			    "host":"smtp.mailtrap.io",
			    "port":2525,
			  },
			"deletedAt": null
		}
	]
}
```

### CU: Editar template de email
**Descripción CU:**
- Este CU se utiliza para que los microservicios externos que consumen este microservicio, puedan editar un template creado anteriormente, en caso de que se necesite modificar la configuración inicial (connection, subject) o el cuerpo del mail (html)

**Flujo normal:**
- Los campos `subject`, `html` y `connection` no pueden ir vacios o no definidos
- Si el body llegara a contener algun campo de `moduleName` y/o `templateName`, seran totalmente ignorados
- Se busca el template con los atributos `moduleName`+`templateName` ingresados
- Se actualiza el template con los valores de los campos ingresados en el body

**Flujos alternativo:**
- No existe un template creado para la combinacion de `moduleName`+`templateName` ingresados

**Interfaz REST**

`PUT: /v1/template/{moduleName}/{templateName}`
*Headers*
Authorization: Bearer token

*Response*
`200 OK` si se edita el Template

*Response*
`404 Error` si no existe Template creado para la combinación

### CU: Eliminar template de email
**Descripción CU:**
- Este CU se utiliza para que los microservicios externos que consumen este microservicio, puedan eliminar un template creado anteriormente

**Flujo normal:**
- Se busca el template que coincida con los datos `moduleName`+`templateName` ingresados y se realiza una baja lógica con fecha y hora exactas para evitar errores indeseados en los emails encolados antes de la eliminación
- Se elimina el template de cache de forma definitiva

**Flujos alternativo:**
- No existe un template creado para la combinacion de `moduleName`+`templateName` ingresado.

`DELETE: /v1/template/{moduleName}/{templateName}`
*Headers*
Authorization: Bearer token
*Response*
`200 OK` si se elimina el Template de forma exitosa
```json
{
	"moduleName": "orders",
	"templateName": "created",
	"deletedAt": "2022-01-01 15:30:25"
}
```
*Response*
`404 Error` si no existe Template creado para la combinación

### CU: Enviar email
**Descripción CU:**
- Este CU se utiliza para que los microservicios externos que consumen este microservicio, puedan enviar un email a un destinatario deseado, haciendo uso de un template creado anteriormente, de forma async

**Flujo normal:**
- Se busca el template con `moduleName`+`templateName` ingresados primeramente en cache. Si no existe, se busca en la base de datos
- Se valida que en el campo `htmlData` vengan todos los datos a reemplazar que ya tiene guardado el template en el campo `html`
- Se reemplazan todos los datos del `htmlData` haciendo match como `{{key}}` en el campo `html` del template previamente encontrado en la base de datos
- Se envía el email al destino requerido, ingresado como `to`
- Se guarda en cache, temporalmente, el template buscado anteriormente en la base de datos con el key `email_moduleName_templateName` para recuperarlo de forma más eficiente cuando se vuelva a necesitar

**Flujos alternativo:**
- No existe un template creado para la combinacion de `moduleName`+`templateName` ingresados, se notifica en el canal el error
- Falta un campo en el `htmlData` con respecto al atributo `html` que tiene el template guardado en la base de datos, se notifica en el canal el error

**Interfaz Async (RabbitMQ)**
- **Recibe** para enviar el email en direct `email`
```json
{
	"moduleName": "orders",
	"templateName": "created",
	"to": "johndoe@mail.com"
	"htmlData": {
		"name": "John Doe",
		"orderNumber": 254231
	},
	"referenceId": "43759834"
}
```

- **Responde** con el resultado del envío del email en direct `email-{moduleName}`
```json
{
	"moduleName": "orders",
	"templateName": "created",
	"sent": true,
	"referenceId": "43759834"
}
```

## Modelo de datos

**Template**
```typescript
	id: ObjectId,
	moduleName: { type:  String, required:  true },
	templateName: { type:  String, required:  true },
	subject: { type:  String, required:  true },
	html: { type:  String, required:  true },
	connection: {
		from: { type:  String, required:  true },
		host: { type:  String, required:  true },
		port: { type:  Number, required:  true },
		auth: {
			user: { type:  String, required:  false },
			pass: { type:  String, required:  false }
		}
	},
	deletedAt: { type:  Date, required:  false },
	createdAt: { type:  Date, required:  false },
	updatedAt: { type:  Date, required:  false }

```