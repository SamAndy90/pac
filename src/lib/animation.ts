import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const animatePageIn = () => {
  const splashCoomponent = document.getElementById("splash-component");

  if (splashCoomponent) {
    const tl = gsap.timeline();

    tl.set([splashCoomponent], {
      yPercent: 0,
    }).to([splashCoomponent], {
      yPercent: 100,
      delay: 0.5,
      duration: 1,
      ease: "power2.inOut",
    });
  }
};

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const splashCoomponent = document.getElementById("splash-component");

  if (splashCoomponent) {
    const tl = gsap.timeline();

    tl.set([splashCoomponent], {
      yPercent: -100,
    }).to([splashCoomponent], {
      yPercent: 0,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        router.push(href);
      },
    });
  }
};
