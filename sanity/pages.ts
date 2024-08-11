import { titleField } from "./Sections/titleField";

// Page schema
import { buttonField } from "./Sections/buttonField";
import { portraitField } from "./Sections/portraitField";
export default {
  name: "page",
  title: "Pages",
  type: "document",
  fields: [
    titleField,
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200,
      },
    },
    {
      title: "SEO Schema",
      name: "schemaMarkup",
      type: "schemaMarkup",
    },
    {
      name: "template",
      type: "string",
      options: { list: ["ancillary", "homepageTemplate", "shoptemplate"] },
    },
    {
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
            { type: "page.ancillaryheader" },
            { type: "page.ancillaryimage" },
            { type: "page.textsection" },
            { type: "page.ancillary50" },
            { type: "page.benifits" },
            { type: "page.faq" },
            { type: "page.comingsoon" },
          ],
        },
      ],
    },
    {
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
            { type: "page.slider" },
            { type: "page.joinpeacekeeper" },
            { type: "page.winnersCircle" },
            { type: "page.happeningnow" },
            { type: "page.explore" },
            { type: "page.livecontest" },
          ],
        },
      ],
    },
    {
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
            { type: "page.shopBanner" },
            { type: "page.benifits" },
            { type: "page.comingsoon" },
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
    },
  ],
};
