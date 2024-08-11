import { titleField } from "./titleField";
import { richtextField } from "./richtextField";
export default {
  name: "page.textsection",
  type: "object",
  title: "Ancillary Text Section",

  fields: [titleField, richtextField],
};
