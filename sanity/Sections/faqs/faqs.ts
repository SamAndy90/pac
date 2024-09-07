import { titleField } from "../fields";
import { defineArrayMember, defineField } from "sanity";

export const faqs = defineField({
  name: "faqs",
  type: "object",
  title: "Frequently Asked Question",
  fields: [
    defineField(titleField),
    defineField({
      type: "array",
      title: "Add Question",
      name: "faqs",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "question",
              type: "string",
              title: "Question",
            }),
            defineField({
              name: "answer",
              type: "text",
              title: "Answer",
            }),
          ],
        }),
      ],
    }),
  ],
});
