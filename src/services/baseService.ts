import { Model, ModelStatic, WhereAttributeHash } from "sequelize";

// A função recebe um modelo Sequelize e retorna os métodos de serviço
export const createBaseService = <T extends Model>(model: ModelStatic<T>) => {
  return {
    // Método para encontrar um registro único baseado em qualquer campo
    findOne: async (
      field: keyof T["_attributes"],
      value: string
    ): Promise<T | null> => {
      const whereClause: WhereAttributeHash = { [field]: value };

      return await model.findOne({ where: whereClause });
    },

    // Método para encontrar um registro pelo ID
    findById: async (id: string | number): Promise<T | null> => {
      return await model.findByPk(id);
    },
  };
};
