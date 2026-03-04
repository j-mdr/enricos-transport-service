export type LocalizedData<T> = {
  en: T;
  nl: T;
};

// site data types
export interface SiteData {
  name: string;
  title: string;
  description: string;
  contact: {
    // used for contact page and footer
    address1: string; // contact address (line 1)
    address2: string; // contact address (line 2)
    phone: string; // contact phone number
    email: string; // contact email address
  };
  author: {
    // used for blog post purposes
    name: string;
    email: string;
    twitter: string; // used for twitter cards when sharing a blog post on twitter
  };
  defaultImage: {
    src: string;
    alt: string;
  };
}

// --------------------------------------------------------
// nav data types
export type navLinkItem = {
  text: string;
  link: string;
  newTab?: boolean; // adds target="_blank" rel="noopener noreferrer" to link
  icon?: string; // adds an icon to the left of the text
};

export type navDropdownItem = {
  text: string;
  dropdown: navLinkItem[];
};

export type navMegaDropdownColumn = {
  title: string;
  items: navLinkItem[];
};

export type navMegaDropdownItem = {
  text: string;
  megaMenuColumns: navMegaDropdownColumn[];
};

export type NavItem = navLinkItem | navDropdownItem | navMegaDropdownItem;

export type NavData = CtaButton & {
  navItems: NavItem[];
};

// --------------------------------------------------------
// faq data types
export interface FaqAccordionSectionData extends Pick<Section, "title"> {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export type FaqCartSectionData = FaqAccordionSectionData;

export type FaqSectionData = FaqAccordionSectionData | FaqCartSectionData;

// --------------------------------------------------------
// testimonial data types
interface Testimonial {
  avatar: ImageMetadata; // an imported image
  name: string;
  title: string;
  testimonial: string;
}

export interface TestimonialSwiperSectionData {
  title: string;
  testimonials: Array<Testimonial>;
}

// --------------------------------------------------------
// team data types
interface TeamMember {
  image: ImageMetadata; // an imported image
  name: string;
  title: string;
  bio: string;
}

export interface TeamMemberCardsSectionData {
  title: string;
  teamMembers: TeamMember[];
}

// --------------------------------------------------------
// Content
interface Section {
  title: string;
  description: string;
}

// --------------------------------------------------------
// image
export interface Image {
  image: {
    src: ImageMetadata;
    alt: string;
  };
}

export interface Icon {
  icon: string; // icon string for astro-icon
}

// --------------------------------------------------------
// Hero data interfaces
export interface HeroSideImageSectionData extends Section, CtaButton, Image {}

// --------------------------------------------------------
// Feature data types
export interface FeatureCard {
  icon: string;
  title: string;
  text: string;
}

export interface FeatureCardSmallSectionData extends Pick<Section, "title"> {
  features: FeatureCard[];
}

// --------------------------------------------------------
// Services data types
export interface ServiceCard extends CtaButton, Section, Image {}

export interface ServiceIconCard extends CtaButton, Section, Icon {}

type ServicesSectionData<T> = Pick<Section, "title"> & {
  services: T[];
};

export type ServicesSideImageSectionData = ServicesSectionData<ServiceCard>;
export type ServicesIconSectionData = ServicesSectionData<ServiceIconCard>;

// --------------------------------------------------------
// cta
export interface CtaButton {
  ctaButton: {
    text: string;
    href: string;
  };
}

export interface CtaCardCenterSectionData extends Section, CtaButton {}

// --------------------------------------------------------
// site settings types
export interface SiteSettingsProps {
  useViewTransitions?: boolean;
  useAnimations?: boolean;
}
