# RestServer
>Creado por Jesús Martínez Torres gracias al curso de [NodeJs](https://www.udemy.com/course/node-de-cero-a-experto)

## Primeros pasos
Ejecute el comando `npm install` para instalar todas las dependencias.

## Modo de Uso
* Debes de tener instalado el componente [nodemon](https://www.npmjs.com/package/nodemon) de manera global en su computadora.
* Saque una copia del archivo `.env.example` y renombrelo a `.env`
* Escriba el número de un puerto que quiera usar en la variable **PORT** dentro del archivo `.env`
* Escriba la url de la conexión de la base de datos de Mongo en la variable **MONGODB_CNN** dentro del archivo `.env`
* Escriba una llave de seguridad para firmar los JWT en la variable **SECRET_KEY** dentro del archivo `.env`
* **OPCIONAL**: Si quiere habilitar el inicio de sesión con google debe llenar las variables **GOOGLE_CLIENT_ID** y **GOOGLE_SECRET_ID** ortogadas por google dentro del archivo `.env`
* **Para este aplicativo se necesita tener una cuenta en [claudinary](https://cloudinary.com) para subir archivos multimedia**
  * Una vez que inicie sesión en su cuenta [claudinary](https://cloudinary.com) debe de de llenar las variables **CLOUDINARY_ENVIROMENT**, **CLOUDINARY_API_KEY**, **CLOUDINARY_API_SECRET**, **CLOUDINARY_NAME** que se encuentra dentro del archivo `.env`
* Ejecuta el siguiente comando `nodemon app.js` para ejecutar el aplicativo y visualizarlo en el **localhost:3000**