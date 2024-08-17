import { defineArrayMember, defineField, defineType } from "sanity";
import { LinkIcon } from "@sanity/icons";

export default defineType({
  name: "footerlinks",
  type: "document",
  title: "Footer Links",
  icon: LinkIcon,
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({
      name: "generalLinks",
      type: "array",
      title: "General Links",
      initialValue: [],
      of: [
        defineArrayMember({
          type: "object",
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
      return { title: "Links" };
    },
  },
});
