import { defineArrayMember, defineField } from "sanity";
import { buttons, portraitField, titleField } from "../fields";

export const howToGetEntered = defineField({
  name: "howToGetEntered",
  type: "object",
  title: "How To Get Entered",
  fields: [
    defineField(titleField),
    defineField({
      name: "display",
      title: "Display",
      type: "string",
      options: {
        list: ["hide", "show"],
      },
      initialValue: "show",
    }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) =>
                rule.required().error("A title is required."),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              validation: (rule) =>
                rule.required().error("A description is required."),
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "image",
              options: {
                hotspot: true,
              },
              validation: (rule) =>
                rule.required().error("An icon is required."),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "How To Get Entered" };
    },
  },
});
