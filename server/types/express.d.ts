// types/express/index.d.ts
import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    id?: string; // or `id: string` if it's always present after auth
  }
}
