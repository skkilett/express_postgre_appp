declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: number;
        ADDRESS: string;
        PROVIDER_LINK: string;
        TOKEN_ADDRESSES_LINK: string;
      }
    }
  }
  
  export {}

