export interface IBase {
  create(data: any): Promise<object>;
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

  public async create(data: any): Promise<object> {
    return {};
  }

  public async update(filter: object, data: object): Promise<object> {
    return {};
  }

  public async delete(filter: object): Promise<object> {
    return {};
  }

  public async getUnique(filter: object): Promise<object> {
    return {};
  }

  public async get(filter: object): Promise<object> {
    return {};
  }

  public async getAll(filter: object): Promise<Array<object>> {
    return [];
  }
}
