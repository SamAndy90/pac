import { titleField } from "../fields/titleField";
import { buttonField } from "../fields/buttonField";
import { portraitField } from "../fields/portraitField";
import { defineArrayMember, defineField } from "sanity";

export const benifits = defineField({
  name: "page.benifits",
  type: "object",
  title: "Benifits",
  fields: [
    defineField(titleField),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "Title",
              title: "Event Name",
              type: "string",
            }),
            defineField({
              name: "Intro",
              title: "Event Description",
              type: "text",
            }),
            defineField(portraitField),
          ],
        }),
      ],
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "style",
              title: "Choose Style",
              type: "string",
              options: {
                list: [
                  { title: "Style 1", value: "primary" },
                  { title: "Style 2", value: "secondary" },
                ],
              },
            }),
            defineField({
              name: "text",
              title: "Button Text",
              type: "string",
            }),
            defineField({
              name: "url",
              title: "Button URL",
              type: "string",
            }),
          ],
        }),
      ],
    }),
  ],
});
