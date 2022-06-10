import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host?: string): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  const isTest = process.env.NODE_ENV === "test";

  return createConnection(
    Object.assign(defaultOptions, {
      ...(!isTest && { host }),
      database: isTest ? "rentalx_test" : defaultOptions.database,
    })
  );
};
