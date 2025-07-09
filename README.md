# 🎼 Frontend - Convocatoria de Instrumentos 🎻

Este proyecto es el frontend de una plataforma web para gestionar convocatorias de instrumentos musicales, desarrollado con [Vite](https://vitejs.dev/), React y TypeScript.

---

## 🚀 Tecnologías principales

- ⚡️ [Vite](https://vitejs.dev/) - Empaquetador rápido de frontend
- ⚛️ React - Biblioteca de componentes UI
- 🧠 TypeScript - Tipado estático para mayor robustez
- 💅 Tailwind CSS - Estilización rápida y moderna
- 🔐 Axios - Cliente HTTP para comunicación con el backend

---

## 📁 Estructura del proyecto

 * assets/ # Imágenes, logos, íconos
*  components/ # Componentes reutilizables (botones, cards, etc.)
 * pages/ # Páginas principales (Home, Convocatoria, etc.)
*  services/ # Módulos de conexión con API (usando Axios)
*  hooks/ # Custom hooks
*  types/ # Tipos y modelos TypeScript
*  App.tsx # Componente raíz
*  main.tsx # Punto de entrada


---

## ⚙️ Variables de entorno

Las variables de entorno se definen en un archivo `.env` en la raíz del proyecto. Este archivo no debe subirse al repositorio (está en `.gitignore` por seguridad).

### 📄 Archivo `.env`

```env
VITE_API_URL2=https://backconservatoriomusica-bhe8dsakdqa4a0gp.westus-01.azurewebsites.net
