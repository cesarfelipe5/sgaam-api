import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { apiRouter } from "./routes";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

// Usar o roteador global com o prefixo /api/v1
app.use("/api/v1", apiRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
