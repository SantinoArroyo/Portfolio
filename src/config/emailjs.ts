// Configuración de EmailJS
export const EMAILJS_CONFIG = {
  // Service ID de EmailJS
  SERVICE_ID: 'service_o8gizx8',
  // Template ID de EmailJS
  TEMPLATE_ID: 'template_v9l40ti',
  // Public Key de EmailJS
  PUBLIC_KEY: '7FQ_EyewtpLCv8bQ7'
}

// Función para validar que las credenciales estén configuradas
export const validateEmailJSConfig = () => {
  const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } = EMAILJS_CONFIG
  
  if (SERVICE_ID === 'service_xxxxxxx' || 
      TEMPLATE_ID === 'template_xxxxxxx' || 
      PUBLIC_KEY === 'xxxxxxxxxxxxxxxxxxxxx') {
    console.warn('⚠️ EmailJS no está configurado. Por favor, configura las credenciales en src/config/emailjs.ts')
    return false
  }
  
  return true
} 