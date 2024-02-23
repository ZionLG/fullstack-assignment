import fs from "fs";
import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

import { DataMap, dataTypes } from "./types";

function readJSONFiles(filePaths: string[]) {
  const jsonData: DataMap = {
    fleets: [],
    vessels: [],
    vesselLocations: [],
  };

  filePaths.forEach((filePath) => {
    try {
      const fileData = fs.readFileSync(filePath, "utf8");
      const fileName = filePath.split("/").pop()?.split(".")?.[0]; // Extract file name without extension
      if (fileName) {
        const parsedName = dataTypes.parse(fileName); // Ensure the file name is a valid data type
        jsonData[parsedName] = JSON.parse(fileData);
      }
    } catch (error) {
      console.error(`Error reading file ${filePath}: ${error}`);
    }
  });

  return jsonData;
}
const dataFiles = readJSONFiles([
  "./src/data/fleets.json",
  "./src/data/vessels.json",
  "./src/data/vesselLocations.json",
]);
/**
 * Defines your inner context shape.
 * Add fields here that the inner context brings.
 */
type CreateInnerContextOptions = Partial<CreateFastifyContextOptions>;

/**
 * Inner context. Will always be available in your procedures, in contrast to the outer context.
 *
 * Also useful for:
 * - testing, so you don't have to mock `req`/`res`
 * - tRPC's `createServerSideHelpers` where we don't have `req`/`res`
 *
 * @see https://trpc.io/docs/context#inner-and-outer-context
 */
export function createContextInner(_opts?: CreateInnerContextOptions) {
  return { dataFiles };
}

export function createContext({ req, res }: CreateFastifyContextOptions) {
  const contextInner = createContextInner();

  return {
    ...contextInner,
    req,
    res,
  };
}

export type Context = Awaited<ReturnType<typeof createContextInner>>;
