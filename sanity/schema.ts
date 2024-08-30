import { type SchemaTypeDefinition } from "sanity";

import { generalLink } from "./Sections/generalLink";
import socialLink from "./Sections/socialLink";
import pageShopBanner from "./Sections/pageBanner";
import PageAncillaryHeader from "./Sections/PageAncillaryHeader";
import PageAncillaryTextSection from "./Sections/PageAncillaryTextSection";
import PageExplore from "./Sections/PageExplore";
import PageHappeningNow from "./Sections/PageHappeningNow";
import PageJoinpeacekeeper from "./Sections/PageJoinpeacekeeper";
import PageLiveContest from "./Sections/PageLiveContest";
import PageShop from "./Sections/PageShop";
import PageWinnersCircle from "./Sections/PageWinnersCircle";
import PageFaq from "./Sections/pageFaq";
import { HeaderLeft } from "./Sections/headerLeft";
import { HeaderRight } from "./Sections/headerRight";
import pageAncillary50 from "./Sections/pageAncillary50";
import pageImageInfo from "./Sections/pageImageInfo";
import pageImageSection from "./Sections/pageImageSection";
import pageServices from "./Sections/pageServices";
import pageAncillaryImage from "./Sections/pageAncillaryImage";
import pageBenifits from "./Sections/pageBenifits";
import pageComingSoon from "./Sections/pageComingSoon";
import { portraitField } from "./Sections/portraitField";
import { titleField, buttonField } from "./Sections/fields";
import pages from "./pages";
import { logo } from "./Sections/logo";
import Hero from "./Sections/HomePage/hero";
import Header from "./Sections/header";
import Footer from "./Sections/footer";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    Header,
    Footer,
    pages,
    Hero,
    PageExplore,
    PageHappeningNow,
    PageJoinpeacekeeper,
    pageBenifits,
    PageLiveContest,
    PageShop,
    PageWinnersCircle,
    pageComingSoon,
    pageAncillaryImage,
    PageAncillaryHeader,
    pageAncillary50,
    pageImageInfo,
    pageImageSection,
    pageServices,
    PageAncillaryTextSection,
    pageShopBanner,
    PageFaq,
    HeaderLeft,
    HeaderRight,
    generalLink,
    socialLink,
    buttonField,
    titleField,
    portraitField,
    logo,
  ],
};
