import { defineField } from "sanity";

export const hero = defineField({
  name: "hero",
  type: "object",
  title: "Hero",
  fields: [
    defineField({
      name: "title",
      title: "Main Heading",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Main Description",
      type: "text",
    }),
    defineField({
      name: "background",
      title: "Main Background",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "videoLink",
      title: "Video Link",
      type: "url",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Hero" };
    },
  },
});
