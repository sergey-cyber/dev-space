import { Client, ClientConfig } from "pg";

interface Props {
  clientConfig: ClientConfig;
  sql: string;
}

export async function executeQuery({ sql, clientConfig }: Props) {
  const client = new Client(clientConfig);
  await client.connect();
  await client.query(sql);
  await client.end();
  return null;
}
