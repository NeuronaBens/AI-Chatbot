# Manual de Despliegue - Calmy

## Requisitos previos

Antes de comenzar con el despliegue, asegúrate de tener lo siguiente:

- Una cuenta en Vercel para el despliegue de la aplicación.
- Una cuenta en Supabase para alojar la base de datos.
- Node.js y npm instalados en tu máquina local.

## Configuración inicial

1. Clona el repositorio de GitHub en tu máquina local:

   ```
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Navega al directorio del proyecto:

   ```
   cd <NOMBRE_DEL_PROYECTO>
   ```

3. Instala las dependencias necesarias:

   ```
   npm install
   npx prisma generate
   npm install @prisma/client
   npm install prisma --save-dev
   ```

## Configuración de variables de entorno

1. Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables de entorno:

   ```
   DATABASE_URL = "postgres://postgres..."
   DIRECT_URL = "postgres://postgres..."
   NEXTAUTH_SECRET = 
   NEXTAUTH_URL = 
   NEXT_PUBLIC_SUPABASE_URL = 
   SERVICE_KEY = "ey..."
   NEXT_PUBLIC_SUPABASE_ANON_KEY = "ey..."
   INVITATION_CODE = 
   ```

2. Crea un archivo .env.local en la raíz del proyecto y agrega las siguientes variables de entorno:

   ```
   OPENAI_API_KEY = 
   JWT_SECRET = 
   ```

   Asegúrate de reemplazar los valores de las variables con tus propias credenciales y claves.

## Ejecución en entorno de desarrollo

1. Inicia el servidor de desarrollo:

   ```
   npm run dev
   ```

2. Abre tu navegador web y visita http://localhost:3000 para ver la aplicación en funcionamiento.

## Despliegue en Vercel

1. Crea una nueva cuenta en Vercel si aún no tienes una.

2. Vincula tu repositorio de GitHub con Vercel:
   - Ve a la sección "Import Project" en el panel de control de Vercel.
   - Selecciona el repositorio de tu aplicación.
   - Configura las opciones de despliegue según tus preferencias.

3. Configura las variables de entorno en Vercel:
   - Ve a la sección "Settings" del proyecto en Vercel.
   - Agrega las variables de entorno definidas en los archivos .env y .env.local.

4. Realiza un push a la rama principal de tu repositorio en GitHub:

   ```
   git push origin main
   ```

   Vercel detectará automáticamente los cambios y desplegará la aplicación.

5. Una vez finalizado el despliegue, podrás acceder a tu aplicación en la URL proporcionada por Vercel.

## Notas adicionales

- La aplicación utiliza Next.js como framework de desarrollo.
- Prisma se utiliza como ORM para interactuar con la base de datos.
- Supabase se utiliza como plataforma de alojamiento para la base de datos.
- El archivo app/page.js es el punto de entrada principal de la aplicación. Puedes comenzar a editar la página modificando este archivo.
- El proyecto utiliza next/font para optimizar y cargar automáticamente la fuente personalizada de Google, Inter.

# Manual de Usuario - Calmy

¡Bienvenido a Calmy! Este manual te guiará a través de las principales funcionalidades y características de la aplicación.

## Registro e Inicio de Sesión

1. Para comenzar, regístrate en la plataforma ingresando tus datos y aceptando los términos y condiciones.

2. Una vez registrado, inicia sesión con tu email y contraseña válidos.

3. Si es tu primer inicio de sesión, se te pedirá que completes algunos datos adicionales de personalización.

## Pantalla de Chat

1. Después de iniciar sesión, accederás a la pantalla de chat donde podrás interactuar con el chatbot.

2. Escribe tus mensajes en el campo de texto y presiona el botón de envío para iniciar la conversación.

3. El chatbot responderá en base a los mensajes anteriores y al contexto de la conversación.

4. Puedes solicitar al chatbot técnicas de relajación, estrategias para mejorar la atención, recomendaciones para situaciones específicas, sugerencias de buenos hábitos, entre otras cosas.

5. Si el chatbot recomienda una actividad específica, podrás verla en la sección de tareas.

## Funcionalidades Adicionales

1. Puedes marcar mensajes específicos como favoritos utilizando el menú de opciones del mensaje.

2. Accede a la sección de mensajes favoritos a través del menú de navegación para ver los mensajes guardados.

3. En la sección de tareas, puedes marcar las actividades recomendadas como completadas.

4. Personaliza tu perfil accediendo a la sección de configuración, donde podrás editar tu descripción y cambiar el tema visual de la aplicación.

5. Accede a la sección de notificaciones a través del menú de navegación lateral para ver las notificaciones recibidas.

## Funcionalidades de Accesibilidad

1. Puedes hacer clic en el botón de reproducción en cualquier mensaje para escuchar un audio generado con IA que lee el contenido del mensaje.

2. Utiliza el micrófono ubicado al lado del botón de envío de mensaje para hablar y convertir tus palabras en texto.

## Tests Psicológicos

1. Accede a la sección de "tests" (exámenes) desde cualquier pantalla de la plataforma.

2. Responde todas las preguntas del examen seleccionado y envía tus respuestas.

3. Si ya has realizado algún test anteriormente, podrás ver tus resultados en la línea de tiempo vertical ubicada en la parte inferior de la sección de "tests".

## Ayuda y Soporte

- Si necesitas ayuda adicional, accede a la sección de ayuda a través del botón en la barra lateral de navegación, donde encontrarás preguntas frecuentes y detalles adicionales.

- Para cualquier problema o inquietud, no dudes en ponerte en contacto con nuestro equipo de soporte.

¡Disfruta de tu experiencia en la plataforma de Calmy! Esperamos que encuentres útiles y beneficiosas las funcionalidades que ofrecemos.
