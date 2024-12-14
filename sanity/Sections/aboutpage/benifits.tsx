import { titleField } from "../fields/titleField";
import { portraitField } from "../fields/portraitField";
import { defineArrayMember, defineField } from "sanity";
import { buttons } from "../fields";

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
              name: "title",
              title: "Event Title",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Event Description",
              type: "text",
            }),
            defineField(portraitField),
          ],
        }),
      ],
    }),
    defineField(buttons),
  ],
});
