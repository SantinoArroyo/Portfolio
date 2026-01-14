# 📧 Configuración de EmailJS

Este archivo contiene las instrucciones paso a paso para configurar EmailJS y hacer funcional el formulario de contacto.

## 🚀 Pasos para Configurar EmailJS

### 1. Crear cuenta en EmailJS

1. Ve a [EmailJS](https://www.emailjs.com/) y crea una cuenta gratuita
2. Confirma tu email

### 2. Configurar un Servicio de Email

1. En el dashboard de EmailJS, ve a **Email Services**
2. Haz clic en **Add New Service**
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Conecta tu cuenta de email
5. Guarda el servicio y copia el **Service ID**

### 3. Crear una Plantilla de Email

1. Ve a **Email Templates**
2. Haz clic en **Create New Template**
3. Usa esta plantilla como base:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Nuevo mensaje de contacto</title>
</head>
<body>
    <h2>Nuevo mensaje de contacto desde tu portfolio</h2>
    
    <h3>Información del remitente:</h3>
    <p><strong>Nombre:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> {{from_email}}</p>
    <p><strong>Asunto:</strong> {{subject}}</p>
    
    <h3>Mensaje:</h3>
    <p>{{message}}</p>
    
    <hr>
    <p><small>Este mensaje fue enviado desde tu portfolio personal.</small></p>
</body>
</html>
```

4. Guarda la plantilla y copia el **Template ID**

### 4. Obtener la Public Key

1. Ve a **Account** → **API Keys**
2. Copia tu **Public Key**

### 5. Configurar las Credenciales en el Proyecto

1. Abre el archivo `src/config/emailjs.ts`
2. Reemplaza los valores por defecto con tus credenciales:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'tu_service_id_aqui',
  TEMPLATE_ID: 'tu_template_id_aqui', 
  PUBLIC_KEY: 'tu_public_key_aqui'
}
```

### 6. Probar el Formulario

1. Ejecuta el proyecto: `npm run dev`
2. Ve a la sección de contacto
3. Llena el formulario y envíalo
4. Verifica que recibas el email

## 🔧 Variables de la Plantilla

Las siguientes variables están disponibles en la plantilla:

- `{{from_name}}` - Nombre del remitente
- `{{from_email}}` - Email del remitente
- `{{subject}}` - Asunto del mensaje
- `{{message}}` - Contenido del mensaje
- `{{to_name}}` - Tu nombre (configurado como "Santino Arroyo")
- `{{reply_to}}` - Email para responder (mismo que from_email)

## 🛡️ Seguridad

- **Nunca** subas las credenciales reales a GitHub
- Usa variables de entorno en producción
- El plan gratuito de EmailJS permite 200 emails por mes

## 🚨 Solución de Problemas

### Error: "EmailJS no está configurado"
- Verifica que hayas reemplazado todas las credenciales en `src/config/emailjs.ts`

### Error: "Service not found"
- Verifica que el Service ID sea correcto
- Asegúrate de que el servicio esté activo en EmailJS

### Error: "Template not found"
- Verifica que el Template ID sea correcto
- Asegúrate de que la plantilla esté publicada

### No se reciben emails
- Verifica la carpeta de spam
- Confirma que el servicio de email esté conectado correctamente
- Revisa los logs en el dashboard de EmailJS

## 📱 Configuración para Producción

Para producción, considera usar variables de entorno:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
}
```

Y crear un archivo `.env`:

```env
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```

¡Listo! Tu formulario de contacto ahora debería funcionar correctamente con EmailJS. 