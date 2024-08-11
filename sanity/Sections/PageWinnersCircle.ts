import { titleField } from "./titleField";
export default {
  name: "page.winnersCircle",
  type: "object",
  title: "Winner Circle",

  fields: [
    titleField,
    {
      name: "winners",
      title: "Winners",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "winnerTitle",
              title: "Winner Title",
              type: "string",
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              options: {
                rows: 10,
              },
            },
            {
              name: "videoUrl",
              title: "Video URL",
              type: "string",
            },
            {
              name: "portrait",
              title: "User Image",
              type: "image",
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      options: {
        rows: 10,
      },
    },
  ],
};
