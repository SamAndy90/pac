import { defineArrayMember, defineField } from "sanity";
import { portraitField, titleField } from "../fields";

export const winnersCircle = defineField({
  name: "page.winnersCircle",
  type: "document",
  title: "Winner Circle",
  fields: [
    defineField(titleField),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "winners",
      title: "Winners",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "winnerTitle",
              title: "Winner Title",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
            defineField({
              name: "videoUrl",
              title: "Video URL",
              type: "string",
            }),
            defineField({
              ...portraitField,
              title: "User Image",
            }),
          ],
        }),
      ],
    }),
  ],
});
