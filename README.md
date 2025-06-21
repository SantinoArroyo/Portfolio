# 🚀 Portfolio Personal - José

Un portfolio personal moderno y elegante construido con React, TypeScript y Tailwind CSS. Diseñado para mostrar proyectos, habilidades y experiencia profesional de manera atractiva.

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz elegante con paleta de colores azul y blanco
- 📱 **Responsive**: Optimizado para todos los dispositivos
- ✨ **Animaciones**: Transiciones suaves con Framer Motion
- 🌊 **Glassmorphism**: Efectos de cristal modernos
- 🎯 **Navegación Suave**: Scroll automático entre secciones
- 📧 **Formulario de Contacto**: Funcionalidad de contacto integrada
- 🚀 **Performance**: Optimizado para velocidad y SEO

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para mayor seguridad
- **Tailwind CSS** - Framework de CSS utility-first
- **Framer Motion** - Biblioteca de animaciones
- **React Icons** - Iconos hermosos y consistentes
- **React Router** - Navegación entre páginas

### Herramientas de Desarrollo
- **Vite** - Bundler rápido para desarrollo
- **PostCSS** - Procesamiento de CSS
- **ESLint** - Linting de código
- **Autoprefixer** - Prefijos CSS automáticos

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tuusername/portfolio.git
   cd portfolio
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

### Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Navbar.tsx      # Barra de navegación
│   ├── Hero.tsx        # Sección principal
│   ├── About.tsx       # Información personal
│   ├── Skills.tsx      # Habilidades técnicas
│   ├── Projects.tsx    # Proyectos realizados
│   ├── Contact.tsx     # Formulario de contacto
│   └── Footer.tsx      # Pie de página
├── App.tsx             # Componente principal
├── main.tsx           # Punto de entrada
└── index.css          # Estilos globales
```

## 🎨 Personalización

### Colores
Los colores principales están definidos en `tailwind.config.js`:
- **Primary**: Azules (#3b82f6, #1d4ed8, etc.)
- **Secondary**: Azules claros (#0ea5e9, #0284c7, etc.)

### Contenido
Para personalizar el contenido, edita los siguientes archivos:
- `src/components/Hero.tsx` - Información principal
- `src/components/About.tsx` - Información personal y experiencia
- `src/components/Skills.tsx` - Habilidades técnicas
- `src/components/Projects.tsx` - Proyectos realizados
- `src/components/Contact.tsx` - Información de contacto

### Animaciones
Las animaciones están configuradas en `tailwind.config.js` y se pueden personalizar:
- `fade-in` - Aparecer gradualmente
- `slide-up` - Deslizar hacia arriba
- `slide-down` - Deslizar hacia abajo
- `float` - Efecto flotante
- `glow` - Efecto de brillo

## 📱 Secciones del Portfolio

### 🏠 Hero
- Presentación personal
- Botones de llamada a la acción
- Enlaces a redes sociales
- Indicador de scroll

### 👤 Sobre Mí
- Información personal
- Experiencia profesional
- Historia personal

### 💻 Habilidades
- Categorías de habilidades
- Barras de progreso animadas
- Tecnologías adicionales

### 🚀 Proyectos
- Galería de proyectos
- Filtros por categoría
- Enlaces a demos y código

### 📧 Contacto
- Formulario de contacto
- Información de contacto
- Enlaces a redes sociales

## 🌐 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno si es necesario
3. ¡Listo! Se desplegará automáticamente

### Netlify
1. Sube tu código a GitHub
2. Conecta el repositorio a Netlify
3. Configura el comando de build: `npm run build`
4. Configura el directorio de publicación: `dist`

### GitHub Pages
1. Ejecuta `npm run build`
2. Sube el contenido de `dist` a la rama `gh-pages`
3. Configura GitHub Pages en tu repositorio

## 🔧 Configuración Adicional

### EmailJS (Opcional)
Para hacer funcional el formulario de contacto:

1. Regístrate en [EmailJS](https://www.emailjs.com/)
2. Configura tu servicio de email
3. Obtén las credenciales necesarias
4. Configura las variables de entorno

### Google Analytics
Para agregar analytics:

1. Crea una cuenta en Google Analytics
2. Obtén tu ID de seguimiento
3. Agrega el script en `index.html`

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

- **Email**: jose@ejemplo.com
- **LinkedIn**: [Tu LinkedIn]
- **GitHub**: [Tu GitHub]
- **Portfolio**: [URL de tu portfolio]

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub! 