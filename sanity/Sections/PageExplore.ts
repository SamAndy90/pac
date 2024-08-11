import { titleField } from "./titleField";
export default {
  name: "page.explore",
  type: "object",
  title: "Explore",
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
              name: "cardTitle",
              title: "Card Title",
              type: "string",
            },
            {
              name: "cardImage",
              title: "Card Image",
              type: "image",
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    },
  ],
};
