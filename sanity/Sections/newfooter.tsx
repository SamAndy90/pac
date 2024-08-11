export const NewFooter = {
  name: "newfooter",
  type: "document",
  title: "New Footer",
  fields: [
    { name: "title", title: "Title", type: "string" },
    {
      name: "generalLinks",
      type: "array",
      title: "General Links",
      of: [{ type: "footerLink" }],
    },
    {
      name: "socialLinks",
      type: "array",
      title: "Social Links",
      of: [{ type: "socialLink" }],
    },
    { name: "rotatingtitle", title: "Animated Title", type: "string" },
    { name: "copyright", title: "CopyRights Text", type: "string" },
  ],
};
