import { Model } from "sequelize";
import { createBaseService } from "../services";

interface UniqueValidatorOptions<T extends Model> {
  service: ReturnType<typeof createBaseService<T>>;
  field: keyof T["_attributes"];
  message?: string;
  idField?: string;
}

interface ExistsValidatorOptions<T extends Model> {
  service: ReturnType<typeof createBaseService<T>>;
  message?: string;
}

export const uniqueValidator =
  <T extends Model>({
    service,
    field,
    message,
    idField = "id",
  }: UniqueValidatorOptions<T>) =>
  async (value: string) => {
    const existingRecord = await service.findOne(field, value);

    if (existingRecord) {
      throw new Error(message || `${String(field)} já existe`);
    }

    return true;
  };

// export const existsValidator =
//   <T extends Model>({ service, message }: ExistsValidatorOptions<T>) =>
//   async (value: string) => {
//     const record = await service.findById(value);

//     if (!record) {
//       throw new Error(message || `Registro não encontrado`);
//     }

//     return true;
//   };

export const existsValidator =
  <T extends Model>({ service, message }: ExistsValidatorOptions<T>) =>
  async (values: string[] | string) => {
    // Verifica se é um array
    if (Array.isArray(values)) {
      const invalidIds = [];

      for (const value of values) {
        const record = await service.findById(value); // Verifica se o ID existe

        if (!record) {
          invalidIds.push(value);
        }
      }

      if (invalidIds.length > 0) {
        throw new Error(
          message || `Os seguintes IDs não existem: ${invalidIds.join(", ")}`
        );
      }
    } else {
      // Se não for um array, trata como valor único
      const record = await service.findById(values);

      if (!record) {
        throw new Error(message || `Registro não encontrado`);
      }
    }

    return true;
  };
