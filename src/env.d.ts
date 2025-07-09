/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string; // Agrega aquí todas tus variables de entorno personalizadas
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}