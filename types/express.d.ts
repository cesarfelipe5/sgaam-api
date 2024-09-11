// types/express.d.ts
import { Aluno } from "../src/models";

declare global {
  namespace Express {
    interface Request {
      aluno?: Aluno; // Adiciona a propriedade aluno ao Request
    }
  }
}
