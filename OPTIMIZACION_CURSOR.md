# 🚀 Guía de Optimización de Cursor

## Problemas de Lentitud - Soluciones

### 1. **Configuración de Archivos a Ignorar**

Ya está configurado en `.vscode/settings.json`:

- `node_modules` - No se indexa
- `dist` - No se indexa
- `.vite` - No se indexa

### 2. **Extensiones que Ralentizan**

Desactiva extensiones innecesarias:

- Extensiones de Git pesadas
- Extensiones de análisis de código múltiples
- Extensiones de formateo duplicadas

### 3. **Memoria TypeScript**

Ya configurado: `maxTsServerMemory: 4096`
Si tienes 8GB+ RAM, puedes aumentar a 6144

### 4. **Cerrar Archivos No Usados**

- Cierra pestañas que no uses
- Usa `Ctrl+K W` para cerrar todas las pestañas

### 5. **Reiniciar Cursor**

Si sigue lento:

- `Ctrl+Shift+P` → "Reload Window"
- O cierra y vuelve a abrir Cursor

### 6. **Desactivar Características Pesadas**

En Settings:

- Desactiva "Editor: Semantic Highlighting" si no lo necesitas
- Desactiva "Editor: Inlay Hints" (ya desactivado)

### 7. **Usar Workspace Settings**

Las configuraciones están en `.vscode/settings.json` - solo afectan este proyecto

## ⚡ Mejoras Aplicadas

✅ Archivos ignorados en búsqueda/indexación
✅ Memoria TypeScript optimizada
✅ Sugerencias optimizadas
✅ Watchers de archivos optimizados

## 🔧 Si Sigue Lento

1. **Revisa tu PC:**

   - Mínimo: 8GB RAM, SSD recomendado
   - Cursor funciona bien con 4GB RAM, pero 8GB+ es ideal

2. **Cierra otras aplicaciones:**

   - Navegadores con muchas pestañas
   - Otras IDEs abiertas
   - Aplicaciones pesadas

3. **Reinicia Cursor completamente**

4. **Verifica extensiones:**
   - Desactiva todas las extensiones
   - Activa una por una para encontrar la problemática
