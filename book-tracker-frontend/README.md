# Book Tracker - Biblioteca Digital (Front-end)

Este repositorio contiene el código de la interfaz de usuario de **Book Tracker**, una aplicación web diseñada para buscar, registrar y organizar lecturas personales. Este proyecto representa un paso muy importante en mi camino de aprendizaje como desarrolladora Full Stack, enfocándome en la integración segura entre el cliente y el servidor.

## Funcionalidades

Actualmente, la aplicación cuenta con las siguientes características:
* **Registro e Inicio de Sesión Seguro:** Formularios validados de forma instantánea en el front-end a través de un custom hook.
* **Control de Sesión Permanente:** Uso de tokens JWT almacenados en `localStorage` para mantener la sesión activa al recargar la página.
* **Rutas Protegidas:** Implementación de componentes de orden superior (HOC) para restringir el acceso a usuarios no autorizados.
* **Gestión de Estado Global:** Distribución centralizada de los datos del usuario mediante el uso de la Context API de React.
* **Edición de Perfil:** Posibilidad de actualizar datos de usuario (nombre y foto de avatar) sincronizados directamente con la base de datos.
* **Gestión de Errores de API:** Mensajes informativos integrados en la interfaz ante fallos de autenticación (técnica de *Lifting State Up*).
* **Diseño Neo-brutalista Responsivo:** Interfaz adaptada minuciosamente mediante CSS puro para una visualización óptima en ordenadores, tablets y teléfonos móviles.

## Herramientas y Tecnologías Utilizadas

Para el desarrollo de esta interfaz se utilizaron las siguientes herramientas:
* **React** (Estructuración de componentes y lógica de vistas)
* **React Router DOM** (Gestión de navegación e itinerarios en la app)
* **Context API** (Almacenamiento global del estado de usuario)
* **CSS3 Vanilla** (Uso de Flexbox, Grid y Media Queries dedicadas para la adaptación móvil)
* **Custom Hooks** (Abstracción de la lógica de formularios y validaciones)
* **Fetch API / Promesas** (Comunicación asíncrona con el servidor)
