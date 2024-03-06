import { Base } from "./BaseRespository";

export class ChallengeRepository extends Base {
  constructor(db: any) {
    super(db, "Challenge");
  }
}
