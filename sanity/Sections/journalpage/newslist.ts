import { titleField } from "../fields";
import { defineArrayMember, defineField, defineType } from "sanity";

export const newslist = defineType({
  name: "newslist",
  type: "document",
  title: "News list",
  fields: [
    defineField({
      type: "array",
      name: "news",
      title: "News",
      of: [
        defineArrayMember({
          type: "object",
          title: "Post",
          fields: [
            defineField({
              type: "string",
              name: "article",
              title: "Article",
              options: {
                list: [
                  {
                    title: "Sweepstakes Insights",
                    value: "sweepstakes_insights",
                  },
                  { title: "Adventure Stories", value: "adventure_stories" },
                  {
                    title: "Community & Service",
                    value: "community_&_service",
                  },
                  {
                    title: "Outdoor Gear & Lifestyle",
                    value: "outdoor_gear_&_lifestyle",
                  },
                  {
                    title: "Transparency & Accountability",
                    value: "transparency_&_accountability",
                  },
                  { title: "Tips & How-Tos", value: "tips_&_how-tos" },
                ],
              },
            }),
            defineField(titleField),
            defineField({
              type: "array",
              name: "paragraphs",
              title: "Paragraphs",
              of: [
                defineArrayMember({
                  type: "string",
                }),
              ],
            }),
            defineField({
              type: "array",
              name: "gallery",
              title: "Gallery",
              validation: (rule) => rule.max(6),
              of: [
                defineArrayMember({
                  type: "image",
                }),
              ],
            }),
            defineField({
              type: "datetime",
              name: "created",
              title: "Created at:",
              options: {
                dateFormat: "DD MMM,YYYY",
              },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "News List" };
    },
  },
});
