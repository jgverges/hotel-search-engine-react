# 🏨 Buscador de Hoteles - eBooking

Aplicación web moderna para búsqueda de hoteles desarrollada con React 18, TypeScript y Tailwind CSS.

## 🚀 Características

- 🔍 Búsqueda de hoteles con autocompletado (Combobox pattern)
- 📅 Selección de fechas de entrada y salida
- 👥 Gestión de número de huéspedes
- 🏨 Visualización de resultados con tarjetas de hoteles
- 📱 Diseño responsive
- ⚡ Optimizado con React Query para gestión de estado del servidor

## 🛠️ Stack Tecnológico

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **React Router DOM** - Enrutamiento
- **TanStack Query** - Gestión de estado del servidor
- **Lucide React** - Iconos
- **Vitest** - Testing framework

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar tests
npm test
```

## 🏗️ Estructura del Proyecto

```
src/
├── api/              # Cliente API y servicios
├── components/        # Componentes UI reutilizables
├── features/          # Features organizadas por dominio
│   ├── search/       # Feature de búsqueda
│   └── hotels/       # Feature de hoteles
├── lib/               # Utilidades y helpers
├── pages/            # Páginas de la aplicación
├── providers/         # Context providers
└── test/             # Configuración de tests
```

## 🎨 Arquitectura

El proyecto sigue el patrón **Feature-Sliced Design** para una organización escalable y mantenible del código.

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila para producción
- `npm run preview` - Previsualiza el build de producción
- `npm run test` - Ejecuta los tests
- `npm run lint` - Ejecuta el linter

## 🌐 Uso

1. Inicia la aplicación con `npm run dev`
2. Busca hoteles escribiendo al menos 3 caracteres en el campo de destino
3. Selecciona fechas y número de huéspedes
4. Haz clic en "Buscar Hoteles" para ver los resultados
5. Haz clic en cualquier hotel para ver sus detalles

## 📄 Licencia

Este proyecto es privado.

## 👨‍💻 Autor

Desarrollado como proyecto de candidatura para eBooking.
