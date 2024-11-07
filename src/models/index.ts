// models/index.ts
export { sequelize } from "../config/db";

export { Aluno, AlunoAttributes, AlunoCreationAttributes } from "./alunoModel";

export {
  FormaPagamento,
  FormaPagamentoAttributes,
  FormaPagamentoCreationAttributes,
} from "./formaPagamentoModel";

export {
  Modalidade,
  ModalidadeAttributes,
  ModalidadeCreationAttributes,
} from "./modalidadeModel";

export {
  Pagamento,
  PagamentoAttributes,
  PagamentoCreationAttributes,
} from "./pagamentoModel";

export {
  Permissao,
  PermissaoAttributes,
  PermissaoCreationAttributes,
} from "./permissaoModel";

export {
  PlanoAluno,
  PlanoAlunoAttributes,
  PlanoAlunoCreationAttributes,
} from "./planoAlunoModel";

export {
  PlanoModalidade,
  PlanoModalidadeAttributes,
  PlanoModalidadeCreationAttributes,
} from "./planoModalidadeModel";

export { Plano, PlanoAttributes, PlanoCreationAttributes } from "./planoModel";

export {
  Telefone,
  TelefoneAttributes,
  TelefoneCreationAttributes,
} from "./telefoneModel";

export {
  Usuario,
  UsuarioAttributes,
  UsuarioCreationAttributes,
} from "./usuarioModel";

export {
  UsuarioPermissao,
  UsuarioPermissaoAttributes,
  UsuarioPermissaoCreationAttributes,
} from "./usuarioPermissaoModel";
