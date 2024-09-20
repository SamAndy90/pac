import { defineField } from "sanity";

export const news = defineField({
  name: "news",
  type: "object",
  title: "News",
  fields: [
    defineField({
      name: "newsref",
      type: "reference",
      title: "News Ref",
      to: [
        {
          type: "newslist",
          title: "News List",
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "News" };
    },
  },
});
