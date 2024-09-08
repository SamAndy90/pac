import { defineField } from "sanity";
import { titleField, buttons, portraitField } from "./fields";

export const joinPeaceKeeper = defineField({
  name: "page.joinpeacekeeper",
  title: "Join Peace Keeper",
  type: "object",
  fields: [
    defineField(titleField),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField(buttons),
    defineField(portraitField),
  ],
});
