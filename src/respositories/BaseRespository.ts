export interface IBase {
  create(data: object): Promise<object>;
  update(filter: object, data: object): Promise<object>;
  delete(filter: object): Promise<object>;
  getUnique(filter: object): Promise<object>;
  get(filter: object): Promise<object>;
  getAll(filter: object): Promise<Array<object>>;
}

export class Base implements IBase {
  private modelName: string;
  private db: any;

  constructor(db: any, modelName: string) {
    this.db = db;
    this.modelName = modelName;
  }

  public async create(data: object): Promise<object> {
    return await this.db[this.modelName].create(data);
  }

  public async update(data: object): Promise<object> {
    return await this.db[this.modelName].update(data);
  }

  public async delete(filter: object): Promise<object> {
    return await this.db[this.modelName].delete(filter);
  }

  public async getUnique(filter: object): Promise<object> {
    return await this.db[this.modelName].findUnique(filter);
  }

  public async get(filter: object): Promise<object> {
    return await this.db[this.modelName].findFirst(filter);
  }

  public async getAll(filter: object): Promise<Array<object>> {
    return await this.db[this.modelName].findMany(filter);
  }
}
