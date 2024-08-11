import { titleField } from "./titleField";
import { portraitField } from "./portraitField";
export default {
  name: "page.faq",
  type: "object",
  title: "Frequently Asked Question",
  fields: [
    titleField,
    {
      name: "faqs",
      title: "Add Question",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "question",
              type: "string",
              title: "Question",
            },
            {
              name: "answer",
              type: "text",
              title: "Answer",
            },
          ],
        },
      ],
    },
  ],
};
