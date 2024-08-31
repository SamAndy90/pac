import { titleField } from "./fields/titleField";
import { portraitField } from "./fields/portraitField";
export default {
  name: "page.shopBanner",
  type: "object",
  title: "Shop Banner",
  fields: [
    titleField,
    portraitField,
    {
      name: "bannerStyle",
      title: "Choose Banner Style",
      type: "string",
      options: {
        list: [
          { title: "Large", value: "large" },
          { title: "Small", value: "small" },
        ],
      },
    },
  ],
};
