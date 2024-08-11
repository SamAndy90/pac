export default {
  name: "footerLink",
  type: "object",
  title: "Footer Link",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "generallink",
      title: "General",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },

            {
              name: "url",
              type: "string",
              title: "URL",
            },
          ],
        },
      ],
    },
  ],
};
