// deno-lint-ignore-file no-explicit-any
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

const [ DATA_API_KEY, APP_ID, DATA_SOURCE ] = [
  Deno.env.get('DATA_API_KEY'),
  Deno.env.get('APP_ID'),
  Deno.env.get('DATA_SOURCE'),
];
const BASE_URI = `https://data.mongodb-api.com/app/${APP_ID}/endpoint/data/v1/action`;
const DATABASE = "gift_list_db";

const createOptions = (query: any) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "api-key": "" + DATA_API_KEY
  },
  body: JSON.stringify(query)
});

const createQuery = (collection: string, rest: any): any => ({
  collection,
  database: DATABASE,
  dataSource: DATA_SOURCE,
  ...rest
});

const uri = (endpoint: string) => `${BASE_URI}/${endpoint}`;

export async function insertOne(collection: string, document: any): Promise<string> {
  const query = createQuery(collection, { document });
  const options = createOptions(query);
  const dataResponse = await fetch(uri('insertOne'), options);
  const { insertedId } = await dataResponse.json();
  return insertedId;
}

export async function findOne<T = any>(collection: string, findData: {filter: any; projection?: any}): Promise<T | null> {
  const query = createQuery(collection, findData);
  const options = createOptions(query);
  const dataResponse = await fetch(uri('findOne'), options);
  const { document } = await dataResponse.json();
  return document;
}

export async function deleteMany(collection: string, filter: any): Promise<number> {
  const query = createQuery(collection, { filter });
  const options = createOptions(query);
  const dataResponse = await fetch(uri('deleteMany'), options);
  const { deletedCount } = await dataResponse.json();
  return deletedCount;
}
