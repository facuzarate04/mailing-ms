# Microservicio de Mailing
Microservicio utilizado para enviar mails de forma asíncrona. 
Permite crear templates custom por un usuario con rol de administrador y utiliza estos templates previamente cargados para hacer el envío de mails, de acuerdo al tipo de email que se desee enviar.
## Dependencias

#### Node  v16.14.0
Seguir los pasos de instalación del sitio oficial  [nodejs.org](https://nodejs.org/en/)

#### MongoDB
La base de datos se almacena en MongoDB. [mongodb.com](https://www.mongodb.com/home)

#### RedisDB
La base de datos en memoria utiliza Redis. [redis.com](https://redis.com/)

#### RabbitMQ
Este microservicio recibe solicitudes de envío y responde a esas solicitudes con Rabbit. [rabbitmq.com](https://www.rabbitmq.com/)

## Configuración

Crear un archivo `.env` en el directorio raíz del proyecto
```bash
cat > .env
```
Una vez creador el archivo agregar las siguientes variables de entorno
```bash
PORT= #Puerto en el que escucha el servidor
DB_ENDPOINT= #Endpoint base de datos mongo
DB_REDIS=  #Endpoint base de datos redis
RABBIT_URL= #Endpoint broker rabbit
AUTH_CURRENT_USER_ENDPOINT= #Endpoint microservicio de autenticación para obtener usuario autenticado
```

## Ejecución

Abrir ventana de comandos en la carpeta del microservicio y ejecutar :
```bash
npm install && npm start
```

## Ejecución dev Docker

### Requisitos
- Tener instalado Docker desktop [docker.com](https://www.docker.com/)
- Ejecutar Docker desktop

#### Pasos
Abrir ventana de comandos en la carpeta del microservicio y ejecutar :
```bash
docker-compose up -d && npm install && npm start