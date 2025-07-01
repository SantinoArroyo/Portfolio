import { useState, useCallback } from 'react'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG, validateEmailJSConfig } from '../config/emailjs'
import { FormData } from '../types'

interface EmailJSResponse {
  success: boolean
  message: string
}

export const useEmailJS = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendEmail = useCallback(async (formData: FormData): Promise<EmailJSResponse> => {
    // Validar configuración
    if (!validateEmailJSConfig()) {
      return {
        success: false,
        message: 'EmailJS no está configurado correctamente'
      }
    }

    setIsLoading(true)
    setError(null)

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Santino Arroyo', // Tu nombre
        reply_to: formData.email
      }

      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      )

      if (response.status === 200) {
        return {
          success: true,
          message: '¡Mensaje enviado exitosamente!'
        }
      } else {
        throw new Error('Error al enviar el mensaje')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setError(errorMessage)
      return {
        success: false,
        message: `Error al enviar el mensaje: ${errorMessage}`
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const resetError = useCallback(() => {
    setError(null)
  }, [])

  return {
    sendEmail,
    isLoading,
    error,
    resetError
  }
} 