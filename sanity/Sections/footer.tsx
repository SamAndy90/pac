import { defineArrayMember, defineField, defineType } from "sanity";
import { link } from "./fields";

export default defineType({
  name: "footer",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({
      name: "logo",
      type: "image",
      title: "Logo",
      options: {
        hotspot: true,
      },
    }),
    defineField({ name: "copyright", type: "string", title: "Copyright" }),
    defineField({
      name: "links",
      type: "array",
      title: "General Links",
      initialValue: [],
      of: [defineArrayMember(link)],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Footer Content" };
    },
  },
});
