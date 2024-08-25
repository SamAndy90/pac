import { titleField } from "./fields/titleField";
import { buttonField } from "./fields/buttonField";
import { portraitField } from "./portraitField";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "page.imageInfo",
  type: "object",
  title: "Image Info Section",
  fields: [
    defineField(titleField),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "bgColor",
      title: "Choose Background Color",
      type: "simplerColor",
    }),
    defineField({
      name: "textColor",
      title: "Choose Text Color",
      type: "simplerColor",
    }),
    defineField(buttonField),
    defineField(portraitField),
  ],
});
