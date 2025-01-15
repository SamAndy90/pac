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
      title: "Choose background",
      name: "bg",
      type: "string",
      options: {
        list: ["image", "file", "url"],
      },
    }),
    defineField({
      name: "picture",
      title: "Picture",
      type: "image",
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => {
        return parent.bg !== "image";
      },
    }),
    defineField({
      title: "Video Link",
      name: "videoLink",
      type: "url",
      hidden: ({ parent }) => {
        return parent.bg !== "url";
      },
    }),
    defineField({
      title: "Video File",
      name: "videoFile",
      type: "file",
      hidden: ({ parent }) => {
        return parent.bg !== "file";
      },
    }),
  ],
  preview: {
    prepare() {
      return { title: "Hero" };
    },
  },
});
