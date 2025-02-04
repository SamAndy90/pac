// import { authMiddleware } from "@clerk/nextjs/server";

// export default authMiddleware({
//   publicRoutes: (req) =>
//     (
//       req.url.includes("/studio") ||
//       req.url.includes("/dashboard") ||
//       req.url.includes("/contests") ||
//       req.url.includes("/shop")
//     ),
// });

import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs/server";

export default function combinedMiddleware(request: NextRequest, event: any) {
  const { cookies } = request;
  const ageVerified = cookies.get("ageVerified");

  if (
    !ageVerified &&
    !request.nextUrl.pathname.startsWith("/age-restriction")
  ) {
    return NextResponse.redirect(new URL("/age-restriction", request.url));
  }

  return authMiddleware({
    publicRoutes: (req) =>
      !(
        req.url.includes("/studio") ||
        req.url.includes("/dashboard") ||
        req.url.includes("/contests") ||
        req.url.includes("/shop")
      ),
  })(request, event);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.)"],
};
