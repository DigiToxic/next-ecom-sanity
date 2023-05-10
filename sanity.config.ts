import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./sanity/schemas";

const config = defineConfig({
  projectId: "h327rol4",

  dataset: "production",

  title: "Sanity-ecom",

  apiVersion: "2023-04-14",

  basePath: "/admin",

  plugins: [deskTool()],

  schema: { types: schemas },
});

export default config;
