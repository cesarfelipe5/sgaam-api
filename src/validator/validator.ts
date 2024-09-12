import { Model } from "sequelize";
import { createBaseService } from "../services";

interface UniqueValidatorOptions<T extends Model> {
  service: ReturnType<typeof createBaseService<T>>;
  field: keyof T["_attributes"];
  message?: string;
}

interface ExistsValidatorOptions<T extends Model> {
  service: ReturnType<typeof createBaseService<T>>;
  message?: string;
}

export const uniqueValidator =
  <T extends Model>({ service, field, message }: UniqueValidatorOptions<T>) =>
  async (value: string) => {
    const existingRecord = await service.findOne(field, value);

    if (existingRecord) {
      throw new Error(message || `${String(field)} já existe`);
    }

    return true;
  };

export const existsValidator =
  <T extends Model>({ service, message }: ExistsValidatorOptions<T>) =>
  async (value: string) => {
    const record = await service.findById(value);

    if (!record) {
      throw new Error(message || `Registro não encontrado`);
    }

    return true;
  };
