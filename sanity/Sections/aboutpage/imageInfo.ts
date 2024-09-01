import { titleField } from "../fields/titleField";
import { buttonField } from "../fields/buttonField";
import { portraitField } from "../fields/portraitField";
import { defineField } from "sanity";

export const imageInfo = defineField({
  name: "page.ancillary50",
  type: "object",
  title: "Image Info",
  fields: [
    defineField(titleField),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
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