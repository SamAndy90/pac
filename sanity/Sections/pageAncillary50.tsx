import { titleField } from "./fields/titleField";
import { buttonField } from "./fields/buttonField";
import { portraitField } from "./portraitField";
export default {
  name: "page.ancillary50",
  type: "object",
  title: "Ancillary 50 Section",

  fields: [
    {
      name: "name",
      title: "name",
      type: "string",
    },
    titleField,
    {
      name: "description",
      title: "Description",
      type: "text",
      options: {
        rows: 10,
      },
    },
    {
      name: "bgColor",
      title: "Choose Background Color",
      type: "simplerColor",
    },
    {
      name: "textColor",
      title: "Choose Text Color",
      type: "simplerColor",
    },
    buttonField,
    portraitField,
  ],
};
