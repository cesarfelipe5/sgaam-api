import { Response } from "express";

// Quando data for passado, message é obrigatório
interface SuccessResponse {
  res: Response;
  status: number;
  message: string;
  data?: any;
  error?: never; // Quando data for passado, error não é permitido
}

// Quando error for passado, message é opcional e data é proibido
interface ErrorResponse {
  res: Response;
  status: number;
  error: unknown;
  message?: string; // Agora message é opcional no caso de erro
  data?: never; // Quando error for passado, data não é permitido
}

// Combina os dois tipos
type SendResponseProps = SuccessResponse | ErrorResponse;

export const sendResponse = (props: SendResponseProps) => {
  const { res, status } = props;

  // Verifica se é uma resposta de erro
  if ("error" in props && props.error) {
    const errorMessage =
      props.error instanceof Error ? props.error.message : "Erro desconhecido.";

    return res.status(500).json({
      status: 500,
      message: props.message || "Erro no servidor.", // Usa message opcional se fornecido
      error: errorMessage,
    });
  }

  // Se não for erro, é uma resposta de sucesso
  return res.status(status).json({
    status,
    message: props.message, // Aqui message é obrigatório
    data: props.data || null, // Aqui data é obrigatório
  });
};
