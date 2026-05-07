declare module 'cors' {
  import { RequestHandler } from 'express';

  interface CorsOptions {
    origin?: string | string[] | boolean | ((origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => void);
    credentials?: boolean;
    exposedHeaders?: string | string[];
    allowedHeaders?: string | string[];
    methods?: string | string[];
    maxAge?: number;
    preflightContinue?: boolean;
    optionsSuccessStatus?: number;
  }

  function cors(options?: CorsOptions): RequestHandler;
  export = cors;
}
