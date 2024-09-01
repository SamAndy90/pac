import { type SchemaTypeDefinition } from "sanity";

import pageShopBanner from "./Sections/pageBanner";
import PageShop from "./Sections/PageShop";
import PageFaq from "./Sections/pageFaq";
import pageImageInfo from "./Sections/aboutpage/pageImageInfo";
import pageComingSoon from "./Sections/pageComingSoon";

import Header from "./Sections/header";
import Footer from "./Sections/footer";
import pages from "./pages";
// import {
//   hero,
//   joinPeaceKeeper,
//   liveContest,
//   explore,
//   happeningNow,
//   winnersCircle,
// } from "./Sections/homepage";
import { hero } from "./Sections/hero";
import { joinPeaceKeeper } from "./Sections/joinPeaceKeeper";
import { liveContest } from "./Sections/liveContest";
import { explore } from "./Sections/explore";
import { happeningNow } from "./Sections/happeningNow";
import { winnersCircle } from "./Sections/winnersCircle";
import {
  aboutHero,
  textSection,
  imageInfo,
  services,
  imageSection,
  benifits,
} from "./Sections/aboutpage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    Header,
    Footer,
    pages,
    hero,
    joinPeaceKeeper,
    liveContest,
    explore,
    happeningNow,
    winnersCircle,
    aboutHero,
    textSection,
    imageInfo,
    services,
    imageSection,
    benifits,
    PageShop,
    pageComingSoon,
    pageImageInfo,
    pageShopBanner,
    PageFaq,
  ],
};
