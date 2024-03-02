import { Base } from "./BaseRespository";

export class StoryRepository extends Base {
  constructor(db: any) {
    super(db, "Story");
  }
}
