import { type SchemaTypeDefinition } from "sanity";

import pageShopBanner from "./Sections/pageBanner";
import PageShop from "./Sections/PageShop";
import pageImageInfo from "./Sections/aboutpage/pageImageInfo";
import pageComingSoon from "./Sections/pageComingSoon";

import Header from "./Sections/header";
import Footer from "./Sections/footer";
import pages from "./pages";
import {
  hero,
  joinPeaceKeeper,
  liveContest,
  explore,
  happeningNow,
  winnersCircle,
} from "./Sections/homepage";
import {
  aboutHero,
  textSection,
  imageInfo,
  services,
  imageSection,
  benifits,
} from "./Sections/aboutpage";
import { products, productCard } from "./Sections/shop";
import { newslist, welcome, hotnews, news } from "./Sections/journalpage";
import { faqs } from "./Sections/faqs";
import { privacy } from "./Sections/privacy-policy";
import { contest, contests } from "./Sections/contests";
import { contactdetails, informing } from "./Sections/contact";
import { ageRestriction } from "./Sections/ageRestriction";
import { emailForm } from "./Sections/emailForm";

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
    productCard,
    products,
    faqs,
    privacy,
    welcome,
    hotnews,
    news,
    newslist,
    contest,
    contests,
    contactdetails,
    informing,
    PageShop,
    pageComingSoon,
    pageImageInfo,
    pageShopBanner,
    ageRestriction,
    emailForm,
  ],
};
