# AppSalon

AppSalon es una aplicación versátil que brinda soluciones tanto para usuarios como para administradores de un salón de belleza. Los usuarios pueden solicitar citas para servicios, editar los detalles de sus citas o cancelarlas, mientras que los administradores pueden mantener un registro de todas las citas pendientes para una gestión eficiente del salón.

## Características Clave

### Para Usuarios

- **Solicitud de Citas**: Los usuarios pueden solicitar citas para servicios de belleza. Pueden elegir la fecha, la hora y el servicio deseado.

- **Edición de Citas**: Si un usuario cometió un error en la fecha u hora de su cita, puede editarla para ajustarla a sus necesidades.

- **Cancelación de Citas**: Los usuarios pueden cancelar citas si surgen imprevistos.

### Para Administradores

- **Gestión de Citas**: Los administradores pueden ver una lista completa de todas las citas pendientes, incluyendo el nombre del cliente, el servicio solicitado, la hora y la fecha. Esto facilita la organización y asignación de recursos en el salón.

- **Total a Cobrar**: La aplicación calcula automáticamente el monto total a cobrar por los servicios solicitados, proporcionando una vista rápida de los ingresos proyectados.

## Tecnologías Utilizadas

- **Vue 3**: El proyecto se construyó utilizando Vue 3 para aprovechar las últimas características y mejoras en el framework.

- **Tailwind CSS**: Se implementó Tailwind CSS para estilizar la aplicación de manera eficiente y consistente.

- **Pinia**: Pinia se utilizó para gestionar el estado global de la aplicación de manera efectiva.

- **FormKit**: FormKit simplificó la creación y validación de formularios, facilitando la solicitud y edición de citas.

- **Vue Tailwind Datepicker**: Se incorporó Vue Tailwind Datepicker para proporcionar un calendario interactivo para seleccionar fechas de las citas.

- **Vue Router**: Vue Router permitió la creación de rutas y la navegación fluida entre las diferentes vistas de la aplicación.

- **date-fns**: date-fns se empleó para realizar operaciones de manipulación de fechas y horas en la aplicación.

- **Axios**: Se utilizó Axios para realizar solicitudes HTTP y gestionar la comunicación con el backend de la aplicación.

- **JSON Web Token (JWT)**: JWT se empleó para la autenticación de usuarios y la protección de rutas.

- **vue-toast-notification**: Vue Toast Notification se utilizó para mostrar notificaciones al usuario, proporcionando información importante y feedback visual.

## Backend Personalizado

La aplicación está respaldada por un backend personalizado creado con Node.js y Express, junto con una base de datos MongoDB. Para que la aplicación funcione correctamente, es necesario descargar y ejecutar el backend en tu entorno local. Puedes encontrar el repositorio del backend en el siguiente enlace: [AppSalon Backend](https://github.com/euss99/appsalon_backend).

## Instalación y Uso

1. Clona este repositorio: `git clone https://github.com/euss99/appsalon_frontend.git`
2. Navega a la carpeta del proyecto: `cd appsalon_frontend`
3. Instala las dependencias: `npm install`
4. Inicia el servidor de desarrollo: `npm run dev`
5. Abre tu navegador y visita: `http://localhost:5173`

## Aprendizaje Destacado

Durante el desarrollo de esta aplicación, se adquirieron conocimientos esenciales en la creación de una aplicación web completa utilizando tecnologías modernas de desarrollo front-end y back-end. Se destacan los conceptos de autenticación con JWT, gestión de estados globales con Pinia, creación de formularios eficientes con FormKit y manejo de fechas y horas con date-fns.
