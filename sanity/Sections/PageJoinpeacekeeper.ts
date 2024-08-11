import { titleField } from "./titleField";
import { buttonField } from "./buttonField";
export default {
  name: "page.joinpeacekeeper",
  type: "object",
  title: "Join PeaceKeeper",

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
    {
      name: "portrait",
      title: "Portrait",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
};
