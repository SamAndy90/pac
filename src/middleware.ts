import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: (req) =>
    !(
      req.url.includes("/dashboard") ||
      req.url.includes("/plp-contest") ||
      req.url.includes("/studio") ||
      req.url.includes("/contests") ||
      req.url.includes("/shop")
    ),
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.)"],
};
