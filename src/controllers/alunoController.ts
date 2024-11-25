import { Request, Response } from "express";
import { PlanoAluno, Telefone } from "../models";
import { alunoService } from "../services";
import { sendResponse } from "../utils/responseHamdler";

export const alunoController = {
  listOrSearch: async (req: Request, res: Response) => {
    try {
      let alunos;
      let totalAlunos;

      const { nome } = req.query;
      const showAll = req.query.showAll === "true";
      const perPage = Number(req.query.perPage as string) || 10;
      const currentPage = Number(req.query.currentPage as string) || 1;
      const offset = (currentPage - 1) * perPage;

      if (nome) {
        const { rows, count } = await alunoService.searchAlunos({
          nome: nome as string,
          showAll,
          limit: perPage,
          offset,
        });

        alunos = rows;
        totalAlunos = count;
      } else {
        const { rows, count } = await alunoService.listAlunos({
          limit: perPage,
          offset,
          showAll,
        });

        alunos = rows;

        totalAlunos = count;
      }

      const totalPages = Math.ceil(totalAlunos / perPage);

      return sendResponse({
        res,
        status: 200,
        message: "Alunos listados com sucesso!",
        data: alunos,
        pagination: {
          currentPage,
          perPage,
          totalPages,
          total: totalAlunos,
        },
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao listar alunos.",
        error,
      });
    }
  },

  byId: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const aluno = await alunoService.findAlunoById(Number(id));

      return sendResponse({
        res,
        status: 200,
        message: "Aluno encontrado com sucesso!",
        data: aluno,
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Houve um erro ao buscar o aluno.",
        error,
      });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const {
        idPlano,
        nome,
        cpf,
        rg,
        uf,
        cidade,
        cep,
        numero,
        bairro,
        logradouro,
        telefones,
      } = req.body;

      const aluno = await alunoService.createAluno({
        nome,
        cpf,
        rg,
        uf,
        cidade,
        cep,
        numero,
        bairro,
        logradouro,
      });

      await Telefone.bulkCreate(
        telefones.map((telefone: { tipo: string; numero: string }) => ({
          ...telefone,
          idAluno: aluno.id,
        }))
      );

      // Associa o plano ao aluno na tabela intermediária PlanoAluno
      await PlanoAluno.create({
        idAluno: aluno.id,
        idPlano,
      });

      const alunoComTelefones = await alunoService.findAlunoById(aluno.id);

      return sendResponse({
        res,
        status: 201,
        message: "Aluno criado com sucesso!",
        data: alunoComTelefones,
      });
    } catch (error: unknown) {
      return sendResponse({
        res,
        message: "Houve um erro na criação do aluno.",
        error,
      });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const { idPlano, ...updatedData } = req.body;

      const aluno = await alunoService.updateAluno(Number(id), updatedData);

      if (!aluno) {
        return sendResponse({
          res,
          status: 404,
          message: "Aluno não encontrado.",
        });
      }

      if (idPlano) {
        if (aluno.planoAlunos.length > 0) {
          await PlanoAluno.update(
            {
              idAluno: Number(id),
              idPlano,
            },
            {
              where: {
                id: aluno.planoAlunos[0].id,
              },
            }
          );
        } else {
          await PlanoAluno.create({
            idAluno: Number(id),
            idPlano,
          });
        }
      }

      // Busca os dados atualizados do aluno
      const alunoAtualizado = await alunoService.findAlunoById(Number(id));

      return sendResponse({
        res,
        status: 200,
        message: "Aluno atualizado com sucesso!",
        data: alunoAtualizado,
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao atualizar o aluno.",
        error,
      });
    }
  },

  remove: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await alunoService.deleteAluno(Number(id));

      return sendResponse({
        res,
        status: 200,
        message: "Aluno removido com sucesso!",
      });
    } catch (error) {
      return sendResponse({
        res,
        message: "Erro ao remover aluno.",
        error,
      });
    }
  },
};
