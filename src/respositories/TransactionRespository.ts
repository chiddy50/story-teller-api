import { Base } from "./BaseRespository";

export class TransactionRepository extends Base {
  constructor(db: any) {
    super(db, "Transaction");
  }
}
