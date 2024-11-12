import { sequelize } from "../config/db";
import { Aluno, AlunoAttributes, AlunoCreationAttributes } from "./alunoModel";
import {
  FormaPagamento,
  FormaPagamentoAttributes,
  FormaPagamentoCreationAttributes,
} from "./formaPagamentoModel";

import {
  Usuario,
  UsuarioAttributes,
  UsuarioCreationAttributes,
} from "./usuarioModel";

import {
  Modalidade,
  ModalidadeAttributes,
  ModalidadeCreationAttributes,
} from "./modalidadeModel";
import {
  Pagamento,
  PagamentoAttributes,
  PagamentoCreationAttributes,
} from "./pagamentoModel";
import {
  Permissao,
  PermissaoAttributes,
  PermissaoCreationAttributes,
} from "./permissaoModel";
import {
  PlanoAluno,
  PlanoAlunoAttributes,
  PlanoAlunoCreationAttributes,
} from "./planoAlunoModel";
import {
  PlanoModalidade,
  PlanoModalidadeAttributes,
  PlanoModalidadeCreationAttributes,
} from "./planoModalidadeModel";
import { Plano, PlanoAttributes, PlanoCreationAttributes } from "./planoModel";
import {
  Telefone,
  TelefoneAttributes,
  TelefoneCreationAttributes,
} from "./telefoneModel";
import {
  UsuarioPermissao,
  UsuarioPermissaoAttributes,
  UsuarioPermissaoCreationAttributes,
} from "./usuarioPermissaoModel";

// Inicializar os modelos
Aluno.initModel(sequelize);
FormaPagamento.initModel(sequelize);
Telefone.initModel(sequelize);
Modalidade.initModel(sequelize);
Pagamento.initModel(sequelize);
Permissao.initModel(sequelize);
PlanoAluno.initModel(sequelize);
PlanoModalidade.initModel(sequelize);
Plano.initModel(sequelize);
Usuario.initModel(sequelize);
UsuarioPermissao.initModel(sequelize);

// Registrar associações
Aluno.associate();
Telefone.associate();
FormaPagamento.associate();
Pagamento.associate();
Modalidade.associate();
Permissao.associate();
PlanoAluno.associate();
PlanoModalidade.associate();
Plano.associate();
Usuario.associate();
UsuarioPermissao.associate();

export { sequelize };

export { Aluno, AlunoAttributes, AlunoCreationAttributes };

export {
  FormaPagamento,
  FormaPagamentoAttributes,
  FormaPagamentoCreationAttributes,
};

export { Modalidade, ModalidadeAttributes, ModalidadeCreationAttributes };

export { Pagamento, PagamentoAttributes, PagamentoCreationAttributes };

export { Permissao, PermissaoAttributes, PermissaoCreationAttributes };

export { PlanoAluno, PlanoAlunoAttributes, PlanoAlunoCreationAttributes };

export {
  PlanoModalidade,
  PlanoModalidadeAttributes,
  PlanoModalidadeCreationAttributes,
};

export { Plano, PlanoAttributes, PlanoCreationAttributes };

export { Telefone, TelefoneAttributes, TelefoneCreationAttributes };

export { Usuario, UsuarioAttributes, UsuarioCreationAttributes };

export {
  UsuarioPermissao,
  UsuarioPermissaoAttributes,
  UsuarioPermissaoCreationAttributes,
};
