import { titleField } from "./Sections/fields";

// Page schema
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "page",
  title: "Pages",
  type: "document",
  fields: [
    defineField(titleField),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200,
      },
    }),
    defineField({
      title: "SEO Schema",
      name: "schemaMarkup",
      type: "schemaMarkup",
    }),
    defineField({
      name: "template",
      type: "string",
      options: {
        list: [
          "ancillary",
          "homepageTemplate",
          "shoptemplate",
          "faqstemplate",
          "privacytemplate",
          "journaltemplate",
        ],
      },
    }),
    defineField({
      name: "ancillarysections",
      type: "object",
      hidden: ({ parent }: { parent: any }) =>
        !(parent?.template === "ancillary"),
      fields: [
        {
          name: "sections",
          title: "Sections",
          type: "array",
          of: [
            defineArrayMember({ type: "abouthero" }),
            defineArrayMember({ type: "textsection" }),
            defineArrayMember({ type: "page.ancillary50" }),
            defineArrayMember({ type: "page.imageInfo" }),
            defineArrayMember({ type: "page.image" }),
            defineArrayMember({ type: "page.services" }),
            defineArrayMember({ type: "page.benifits" }),
            defineArrayMember({ type: "page.comingsoon" }),
          ],
        },
      ],
    }),
    defineField({
      name: "homepagetemplatesections",
      type: "object",
      hidden: ({ parent }: { parent: any }) =>
        !(parent?.template === "homepageTemplate"),
      fields: [
        {
          name: "sections",
          title: "Sections",
          type: "array",
          of: [
            defineArrayMember({ type: "hero" }),
            defineArrayMember({ type: "page.joinpeacekeeper" }),
            defineArrayMember({ type: "page.livecontest" }),
            defineArrayMember({ type: "page.explore" }),
            defineArrayMember({ type: "page.happeningnow" }),
            defineArrayMember({ type: "page.winnersCircle" }),
          ],
        },
      ],
    }),
    defineField({
      name: "shoptemplatesections",
      type: "object",
      hidden: ({ parent }: { parent: any }) =>
        !(parent?.template === "shoptemplate"),
      fields: [
        {
          name: "sections",
          title: "Sections",
          type: "array",
          of: [
            defineArrayMember({ type: "page.shopBanner" }),
            defineArrayMember({ type: "page.benifits" }),
            defineArrayMember({ type: "page.comingsoon" }),
            defineArrayMember({ type: "products" }),
          ],
        },
        {
          name: "shoptype",
          title: "Choose Shop Type",
          type: "string",
          options: {
            list: [
              { title: "Merchandize", value: "merces" },
              { title: "Contest", value: "contest" },
              { title: "Peace Social", value: "peace" },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "faqstemplatesections",
      type: "object",
      hidden: ({ parent }: { parent: any }) =>
        !(parent?.template === "faqstemplate"),
      fields: [
        {
          name: "sections",
          title: "Sections",
          type: "array",
          of: [defineArrayMember({ type: "faqs" })],
        },
      ],
    }),
    defineField({
      name: "privacytemplatesections",
      type: "object",
      hidden: ({ parent }: { parent: any }) =>
        !(parent?.template === "privacytemplate"),
      fields: [
        {
          name: "sections",
          title: "Sections",
          type: "array",
          of: [defineArrayMember({ type: "privacy" })],
        },
      ],
    }),
    defineField({
      name: "journaltemplatesections",
      type: "object",
      hidden: ({ parent }: { parent: any }) =>
        !(parent?.template === "journaltemplate"),
      fields: [
        {
          name: "sections",
          title: "Sections",
          type: "array",
          of: [
            defineArrayMember({ type: "welcome" }),
            defineArrayMember({ type: "hotnews" }),
            defineArrayMember({ type: "news" }),
            defineArrayMember({ type: "textsection" }),
            defineArrayMember({ type: "page.image" }),
          ],
        },
      ],
    }),
  ],
});
