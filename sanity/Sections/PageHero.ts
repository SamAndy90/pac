import { buttonField } from "./fields/buttonField";
import { portraitField } from "./portraitField";
export default {
  name: "page.hero",
  type: "object",
  title: "Hero",
  fields: [
    {
      name: "style",
      title: "Choose Style",
      type: "string",
      options: {
        list: [
          { title: "Style 1", value: "style1" },
          { title: "Style 2", value: "style2" },
          { title: "Style 3", value: "style3" },
        ],
      },
    },
    {
      name: "name",
      title: "name",
      type: "string",
    },
    {
      name: "Title",
      title: "main heading",
      type: "string",
    },
    {
      name: "SubTitle",
      title: "sub heading",
      type: "string",
    },
    {
      name: "Intro",
      title: "main intro",
      type: "text",
      Option: {
        rows: 10,
      },
    },
    buttonField,
    portraitField,
  ],
};
