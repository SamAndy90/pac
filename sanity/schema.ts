import { type SchemaTypeDefinition } from "sanity";
import { NewFooter } from "./Sections/newfooter";

import generalLink from "./Sections/generalLink";
import socialLink from "./Sections/socialLink";
import pageShopBanner from "./Sections/pageBanner";
import PageAncillaryHeader from "./Sections/PageAncillaryHeader";
import PageAncillaryTextSection from "./Sections/PageAncillaryTextSection";
import PageExplore from "./Sections/PageExplore";
import PageHappeningNow from "./Sections/PageHappeningNow";
import PageJoinpeacekeeper from "./Sections/PageJoinpeacekeeper";
import PageLiveContest from "./Sections/PageLiveContest";
import PageShop from "./Sections/PageShop";
import PageSlider from "./Sections/PageSlider";
import PageWinnersCircle from "./Sections/PageWinnersCircle";
import PageFaq from "./Sections/pageFaq";
import { buttonField } from "./Sections/buttonField";
import { Footer } from "./Sections/footer";
import { HeaderLeft } from "./Sections/headerLeft";
import { HeaderRight } from "./Sections/headerRight";
import pageAncillary50 from "./Sections/pageAncillary50";
import pageAncillaryImage from "./Sections/pageAncillaryImage";
import pageBenifits from "./Sections/pageBenifits";
import pageComingSoon from "./Sections/pageComingSoon";
import { portraitField } from "./Sections/portraitField";
import { titleField } from "./Sections/titleField";
import pages from "./pages";
import logo from "./Sections/logo";
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    pages,
    PageExplore,
    PageHappeningNow,
    PageJoinpeacekeeper,
    pageBenifits,
    PageLiveContest,
    PageShop,
    PageSlider,
    PageWinnersCircle,
    pageComingSoon,
    pageAncillaryImage,
    PageAncillaryHeader,
    pageAncillary50,
    PageAncillaryTextSection,
    buttonField,
    titleField,
    portraitField,
    NewFooter,
    Footer,
    HeaderLeft,
    HeaderRight,
    generalLink,
    socialLink,
    pageShopBanner,
    PageFaq,
    logo,
  ],
};
