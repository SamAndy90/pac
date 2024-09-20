import { defineField } from "sanity";

export const hotnews = defineField({
  name: "hotnews",
  type: "object",
  title: "Hot News",
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
      return { title: "Hot News" };
    },
  },
});
