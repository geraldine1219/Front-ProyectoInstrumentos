
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // agrega más variables aquí si las necesitas
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
