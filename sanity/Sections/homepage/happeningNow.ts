import { defineArrayMember, defineField } from "sanity";
import { buttons, portraitField, titleField } from "../fields";

export const happeningNow = defineField({
  name: "page.happeningnow",
  type: "object",
  title: "Happening Now",
  fields: [
    defineField(titleField),
    defineField({
      name: "events",
      title: "Events reference",
      type: "reference",
      to: [{ type: "contests" }],
    }),
    defineField(buttons),
  ],
  preview: {
    prepare() {
      return { title: "Happening Now" };
    },
  },
});
