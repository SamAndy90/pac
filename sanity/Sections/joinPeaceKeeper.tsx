import { titleField } from "./fields";
import { buttonField } from "./fields";
import { portraitField } from "./portraitField";
export const JoinPeaceKeeper = {
  name: "joinpeacekeeper",
  title: "Join Peace Keeper",
  type: "document",
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
