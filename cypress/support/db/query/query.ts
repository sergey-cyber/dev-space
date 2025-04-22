import { Sql } from "./sql";

export class Query extends Sql {
  constructor(tableName: string) {
    super(tableName);
  }

  public create(params: { data: Record<string, string> }) {
    return this.insert(params);
  }

  public clearTable() {
    return this.truncate();
  }
}
