# 📊 Configuración de Google Analytics 4

Este documento explica cómo configurar Google Analytics 4 en tu portfolio para trackear eventos personalizados y métricas importantes.

## 🚀 Pasos de Configuración

### 1. Crear una cuenta de Google Analytics

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Crea una nueva cuenta o usa una existente
3. Crea una nueva propiedad para tu portfolio
4. Selecciona "Web" como plataforma
5. Completa la información de tu sitio web

### 2. Obtener el ID de Medición

1. En tu propiedad de GA4, ve a **Administrador** > **Propiedad** > **Configuración de datos**
2. Crea un nuevo flujo de datos web
3. Copia el **ID de medición** (formato: G-XXXXXXXXXX)

### 3. Actualizar la Configuración

Reemplaza `G-XXXXXXXXXX` en los siguientes archivos con tu ID real:

#### `index.html`
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-TU-ID-REAL"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-TU-ID-REAL');
</script>
```

#### `src/config/analytics.ts`
```typescript
export const ANALYTICS_CONFIG = {
  MEASUREMENT_ID: 'G-TU-ID-REAL',
  // ... resto de la configuración
}
```

### 4. Verificar la Instalación

1. Abre tu sitio web
2. Ve a Google Analytics > **Informes** > **Tiempo real**
3. Deberías ver actividad en tiempo real

## 📈 Eventos Personalizados Implementados

### Eventos de Engagement
- **`project_click`**: Cuando un usuario hace click en un proyecto
- **`cv_download`**: Cuando se descarga el CV
- **`contact_form_submit`**: Cuando se envía el formulario de contacto
- **`social_link_click`**: Cuando se hace click en enlaces sociales
- **`project_filter_change`**: Cuando se cambia el filtro de proyectos
- **`scroll_to_section`**: Cuando se navega a una sección específica

### Eventos de Navegación
- **`page_view`**: Vista de página
- **`scroll_depth`**: Profundidad de scroll (25%, 50%, 75%, 100%)
- **`time_on_page`**: Tiempo total en la página

### Eventos de Visibilidad
- **`page_visible`**: Cuando la página se vuelve visible
- **`page_hidden`**: Cuando la página se oculta

## 📊 Dashboard de Métricas

El componente `AnalyticsDashboard` muestra:
- Vistas de página
- Descargas de CV
- Formularios enviados
- Clicks en proyectos
- Tiempo en página
- Tasa de rebote
- Gráfico de actividad reciente

## 🔧 Configuración Avanzada

### Parámetros Personalizados

Los eventos incluyen parámetros personalizados para mejor análisis:

```typescript
// Ejemplo de evento con parámetros
trackEvent({
  action: 'project_click',
  category: 'engagement',
  label: 'ai: Proyecto de IA',
  value: 1
})
```

### Configuración de Conversiones

Para marcar eventos como conversiones en GA4:

1. Ve a **Administrador** > **Propiedad** > **Eventos**
2. Crea eventos personalizados para:
   - `cv_download`
   - `contact_form_submit`
   - `project_click`

### Configuración de Audiencias

Crea audiencias personalizadas basadas en:
- Usuarios que descargaron el CV
- Usuarios que enviaron formularios
- Usuarios que interactuaron con proyectos específicos

## 📱 Testing y Debugging

### Herramientas de Debugging

1. **Google Analytics Debugger** (extensión de Chrome)
2. **Google Tag Assistant**
3. **Console del navegador** - busca mensajes de gtag

### Verificar Eventos

1. Abre las herramientas de desarrollador
2. Ve a la pestaña Network
3. Filtra por "google-analytics"
4. Realiza acciones en tu sitio
5. Verifica que se envíen las peticiones

## 🎯 Métricas Clave a Monitorear

### Engagement
- **Tiempo en página**: Objetivo > 2 minutos
- **Scroll depth**: Objetivo > 75%
- **Clicks en proyectos**: Mide interés en tu trabajo

### Conversiones
- **Descargas de CV**: Mide interés en contratación
- **Formularios enviados**: Mide interés en contacto
- **Clicks en redes sociales**: Mide interés en conectar

### Navegación
- **Páginas más visitadas**: Optimiza contenido
- **Tasa de rebote**: Objetivo < 50%
- **Fuentes de tráfico**: Optimiza marketing

## 🔒 Privacidad y GDPR

### Configuración de Consentimiento

Para cumplir con GDPR, considera implementar:

1. **Banner de cookies** antes de cargar Analytics
2. **Configuración de consentimiento** en GA4
3. **Anonimización de IPs**

### Configuración Recomendada

```typescript
gtag('config', 'G-TU-ID-REAL', {
  anonymize_ip: true,
  allow_google_signals: false,
  allow_ad_personalization_signals: false
});
```

## 🚀 Próximos Pasos

1. **Configurar alertas** para métricas importantes
2. **Crear reportes personalizados** en GA4
3. **Integrar con Google Data Studio** para dashboards avanzados
4. **Configurar remarketing** para audiencias específicas
5. **Implementar A/B testing** basado en datos

## 📞 Soporte

Si tienes problemas con la configuración:

1. Revisa la [documentación oficial de GA4](https://developers.google.com/analytics/devguides/collection/ga4)
2. Verifica que el ID de medición sea correcto
3. Usa las herramientas de debugging mencionadas
4. Revisa la consola del navegador para errores

---

¡Con esta configuración tendrás un sistema completo de analytics para tu portfolio! 🎉 
 