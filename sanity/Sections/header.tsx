import { defineArrayMember, defineField, defineType } from "sanity";
import { link } from "./fields/link";

export default defineType({
  name: "header",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      type: "image",
      title: "Logo",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "leftlinks",
      type: "array",
      title: "Left Header Links",
      initialValue: [],
      of: [defineArrayMember(link)],
    }),
    defineField({
      name: "rightlinks",
      type: "array",
      title: "Right Header Links",
      initialValue: [],
      of: [defineArrayMember(link)],
    }),
    defineField({
      name: "burgerlinks",
      type: "array",
      title: "Burger Menu Links",
      initialValue: [],
      of: [defineArrayMember(link)],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Header Content" };
    },
  },
});
