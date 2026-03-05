import type { CtaButton } from "@config/translations/configDataTypes.ts";

export const createCtaButton = (text: string, href: string): CtaButton => {
  return {
    ctaButton: {
      text,
      href,
    },
  };
};