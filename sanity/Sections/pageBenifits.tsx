import { titleField } from "./fields/titleField";
import { buttonField } from "./fields/buttonField";
import { portraitField } from "./portraitField";
export default {
  name: "page.benifits",
  type: "object",
  title: "PeaceKeeper Benifits",

  fields: [
    titleField,
    {
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "Title",
              title: "Event Name",
              type: "string",
            },

            {
              name: "Intro",
              title: "Event Description",
              type: "text",
              Option: {
                rows: 5,
              },
            },

            portraitField,
          ],
        },
      ],
    },
    {
      name: "buttons",
      title: "Buttons",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "style",
              title: "Choose Style",
              type: "string",
              options: {
                list: [
                  { title: "Style 1", value: "primary" },
                  { title: "Style 2", value: "secondary" },
                ],
              },
            },
            {
              name: "text",
              title: "Button Text",
              type: "string",
            },
            {
              name: "url",
              title: "Button URL",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
};
