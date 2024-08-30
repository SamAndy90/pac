import { defineArrayMember, defineField, defineType } from "sanity";
import { LinkIcon } from "@sanity/icons";

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
      of: [
        defineArrayMember({
          type: "object",
          icon: LinkIcon,
          fields: [
            {
              name: "value",
              title: "Value",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "slug",
              type: "slug",
              title: "URL",
              options: {
                source: "value",
              },
              validation: (rule) => rule.required(),
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare() {
      return { title: "Footer Content" };
    },
  },
});
