import { fields } from "@keystatic/core";
import { wrapper, block } from "@keystatic/core/content-components";

// preview components
import KeystaticAdmonition from "./KeystaticAdmonition";
import KeystaticFaqSection from "./KeystaticFaqSection";

const Admonition = wrapper({
  label: "Admonition",
  ContentView: (props) => (
    <KeystaticAdmonition variant={props.value.variant}>{props.children}</KeystaticAdmonition>
  ),
  schema: {
    variant: fields.select({
      label: "Variant",
      options: [
        { value: "info", label: "Info" },
        { value: "tip", label: "Tip" },
        { value: "caution", label: "Caution" },
        { value: "danger", label: "Danger" },
      ],
      defaultValue: "info",
    }),
    // This makes it so you can edit what is inside the admonition
    content: fields.child({
      kind: "block",
      formatting: { inlineMarks: "inherit", softBreaks: "inherit" },
      links: "inherit",
      editIn: "both",
      label: "Admonition Content",
      placeholder: "Enter your admonition content here",
    }),
  },
});

const FaqSection = (locale: "nl" | "en") =>
  block({
    label: "FAQ Sectie",
    ContentView: (props) => <KeystaticFaqSection faqSet={props.value.faqSet} />,
    schema: {
      faqSet: fields.relationship({
        label: "FAQ Set",
        collection: locale === "nl" ? "faqsNL" : "faqsEN",
      }),
    },
  });

export default {
  Admonition,
  FaqSection,
};
