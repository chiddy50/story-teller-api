import { Base } from "./BaseRespository";

export class UserRepository extends Base {
  constructor(db: any) {
    super(db, "User");
  }
}
