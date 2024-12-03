# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
"# control-gastos" 





|Control de Gastos




Jesus Manuel Ruiz Fuentes 














Características Principales
o	Gestión de gastos e ingresos:
•	Agregar, editar visualizar y eliminar transacciones.
•	Clasificar transacciones en categorías (comida, transporte, ocio, servicios, ropa etc.).
o	Visualización de datos:
•	Mostrar un historial de transacciones.
•	Filtrar transacciones por tipo, fecha o categoría.
o	Gráficos:
•	Mostrar reportes visuales (por ejemplo, un gráfico de barras o pastel) que representen los ingresos y gastos.
o	Autenticación:
•	Iniciar sesión y registrarse utilizando Firebase Authentication.
•	Cuentas protegidas para cada usuario.


Requisitos previos
o	Herramientas necesarias:
•	Node.js (v14 o superior).
•	npm
•	Una cuenta en Firebase.
o	Conocimientos previos:
•	Fundamentos de React.
•	Conceptos básicos de Firebase.




Configuración inicial
•	Firebase
•	React





Documentación del Proyecto: "Control de Gastos"
1. Visión del Proyecto
•	Objetivo: Proporcionar una plataforma simple y eficiente para que los usuarios gestionen sus ingresos y egresos, visualicen datos financieros y mantengan un control sobre su presupuesto personal.
•	Ámbito:
o	Frontend: React para construir la interfaz de usuario.
o	Backend y base de datos: Firebase (Authentication y Firestore).
•	Usuarios objetivo: Personas que desean un control básico de sus finanzas sin la complejidad de aplicaciones avanzadas.
________________________________________
2. Requerimientos
Requerimientos funcionales
1.	Gestión de transacciones:
o	Registrar ingresos y egresos.
o	Editar y eliminar transacciones.
o	Clasificar transacciones por categorías.
2.	Visualización:
o	Mostrar un historial de transacciones.
o	Gráficos que representen los datos financieros.
3.	Autenticación:
o	Registro e inicio de sesión con email y contraseña.
o	Cada usuario solo tiene acceso a sus datos.
Requerimientos no funcionales
1.	Usabilidad:
o	Interfaz intuitiva y responsive para dispositivos móviles y de escritorio.
2.	Rendimiento:
o	Respuesta rápida para mostrar datos almacenados en Firebase.
3.	Escalabilidad:
o	Uso de Firebase para manejar usuarios concurrentes y almacenamiento en la nube.
4.	Seguridad:
o	Manejo de datos seguros usando reglas de Firestore y Firebase Authentication.
________________________________________
3. Diseño de Arquitectura
3.1 Arquitectura General
El proyecto sigue la arquitectura MVC (Model-View-Controller) adaptada para aplicaciones React:
1.	Model: Firebase Firestore como la capa de datos.
2.	View: Componentes React que renderizan la UI.
3.	Controller: Lógica implementada en hooks y contextos de React para manejar estados y lógica de negocio.
4. Patrones de Diseño
4.1 Patrones utilizados
1.	Context API para Inyección de Dependencias:
o	Ejemplo: AuthContext para manejar la autenticación en toda la aplicación.
2.	Patrón de Contenedor-Presentación:
o	Componentes contenedores (e.g., Transactions) se encargan de la lógica.
o	Componentes presentacionales (e.g., TransactionItem) solo renderizan la UI.
3.	Lazy Loading:
o	Uso de React.lazy para cargar vistas (como el Dashboard) de manera diferida.
4.	Separación de Preocupaciones:
o	Firebase logic (datos) y lógica de la interfaz (React) están separadas.
4.2 Buenas Prácticas
•	Consistencia:
o	Nombrar componentes y funciones de forma clara (AddTransaction, fetchTransactions).
•	Reusabilidad:
o	Crear componentes pequeños y modulares (e.g., un componente genérico Button).
•	Manejo de errores:
o	Mensajes de error claros para fallos en autenticación o acceso a Firestore.
________________________________________
5. Casos de Uso
Caso de Uso: Registrar una Transacción
1.	Actor: Usuario autenticado.
2.	Precondición: El usuario debe estar autenticado y en el Dashboard.
3.	Flujo principal:
o	El usuario ingresa datos (tipo, monto, categoría, descripción).
o	Presiona el botón de "Agregar".
o	La aplicación guarda la transacción en Firestore y actualiza la lista en pantalla.
4.	Excepciones:
o	Datos incompletos o inválidos (mostrar mensaje de error).
o	Fallo de conexión a la base de datos (notificar al usuario).
________________________________________
6. Reglas de Negocio
1.	Solo los usuarios autenticados pueden acceder al Dashboard.
2.	Cada usuario solo puede ver sus propias transacciones.
3.	El monto de una transacción debe ser un número positivo.
8. Plan de Desarrollo
1.	Semana 1: Diseño y Configuración
o	Configurar React y Firebase.
o	Crear vistas básicas (Home, Login, Register).
2.	Semana 2: Lógica y Funcionalidad
o	Implementar autenticación con Firebase.
o	Configurar Firestore y el modelo de datos.
o	Crear funcionalidad de agregar y listar transacciones.
3.	Semana 3: Mejoras y Estilo
o	Implementar gráficos con Chart.js.
o	Estilizar la interfaz con CSS/Bootstrap.
4.	Semana 4: Pruebas y Despliegue
o	Realizar pruebas de usabilidad y funcionalidad.
o	Desplegar la aplicación en Firebase Hosting.
________________________________________
9. Buenas Prácticas
1.	Versionamiento del Código:
o	Usar Git y mantener ramas separadas para cada funcionalidad.
2.	Documentación del Código:
o	Añadir comentarios claros para lógica compleja.
3.	Pruebas:
o	Probar flujos críticos como autenticación y gestión de transacciones.
4.	Accesibilidad:
o	Usar etiquetas semánticas y colores accesibles para usuarios con discapacidades.
 

