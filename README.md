# Alivio App - Frontend (WEB)

Frontend WEB desarrollado para la clase de **UX mejoramiento de la experiencia de usuario**

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 20.19 o superior)
- pnpm o npm

Recomendamos el uso de `nvm` para gestionar versiones de Node.js.

### Pasos para ejecutar

<!-- Info to use nvm -->
> [!IMPORTANT]
> Si usas `nvm`, asegúrate de tener la versión correcta de Node.js instalada y activa: `nvm install 20.19`\

1. **Instalar dependencias**
   ```bash
   pnpm install
    # o si usas npm
   npm install
   ```

2. **Ejecutar en modo desarrollo**
   ```bash
   pnpm dev
   # o si usas npm
   npm run dev
   ```

3. **Construir para producción**
   ```bash
   pnpm build
   # o si usas npm
   npm run build
   ```

4. **Previsualizar build de producción**
   ```bash
   pnpm preview
   # o si usas npm
   npm run preview
   ```

## 🛠️ Tecnologías

- **React 18** - Biblioteca de interfaz de usuario
- **Material-UI (MUI)** - Componentes de diseño
- **Vite** - Herramienta de construcción
- **TypeScript** - Tipado estático
- **React Router** - Navegación

## 📱 Funcionalidades Desarrolladas

- Log in de usuario
- Sign up de usuario
- Ver lista de alarmas
- Crear una alarma

La aplicación estará disponible en `http://localhost:5173`