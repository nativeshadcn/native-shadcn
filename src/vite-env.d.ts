/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REGISTRY_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Support for ?raw imports
declare module '*?raw' {
  const content: string
  export default content
}
