export class Sql {
  private readonly tableName;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  protected insert(params: { data: Record<string, string> }) {
    const keys = Object.keys(params.data);
    const values = Object.values(params.data);

    return `
      INSERT INTO "${this.tableName}" (${this.putInQuotes(keys).join(",")})
      VALUES (${this.putInQuotes(values, "single").join(",")});
    `;
  }

  protected truncate() {
    return `TRUNCATE TABLE "${this.tableName}" RESTART IDENTITY CASCADE;`;
  }

  private putInQuotes(str: string, quotesType?: "single" | "double"): string;
  private putInQuotes(
    strs: string[],
    quotesType?: "single" | "double",
  ): string[];
  private putInQuotes(
    arg: string | string[],
    quotesType: "single" | "double" = "double",
  ) {
    const map: Record<typeof quotesType, (str: string) => string> = {
      single: (str) => `'${str}'`,
      double: (str) => `"${str}"`,
    };
    const format = map[quotesType];
    if (typeof arg === "string") {
      return format(arg);
    } else {
      return arg.map((s) => format(s));
    }
  }
}
