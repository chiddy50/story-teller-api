import { Base } from "./BaseRespository";

export class StoryTransactionRepository extends Base {
  constructor(db: any) {
    super(db, "StoryTransaction");
  }
}
