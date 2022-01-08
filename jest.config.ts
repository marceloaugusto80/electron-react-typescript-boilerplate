import {InitialOptionsTsJest, pathsToModuleNameMapper} from "ts-jest";
import {compilerOptions} from "./tsconfig.json";

const config: InitialOptionsTsJest = {

  clearMocks: true,

  coverageProvider: "v8",

  globalSetup: "./src/__tests__/setup.ts",

  globalTeardown: "./src/__tests__/teardown.ts",

  preset: "ts-jest",

  roots: [
     "./src/__tests__"
  ],

  testEnvironment: "node",

  testMatch: [
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],

  testPathIgnorePatterns: [
    "\\\\node_modules\\\\"
  ],

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths)

};

export default config;