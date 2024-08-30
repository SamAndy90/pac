import { defineField } from "sanity";
import { LinkIcon } from "@sanity/icons";

export const link = defineField({
  name: "link",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "URL",
      options: {
        source: "value",
      },
      validation: (rule) => rule.required(),
    }),
  ],
});
