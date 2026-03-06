export type LocalizedData<T> = {
  en: T;
  nl: T;
};

type SocialLink = {
  url: string; // full URL to the social media profile
  id: string; // the username or page name on the social media platform, used for display purposes
};

// site data types
export interface SiteData {
  name: string;
  title: string;
  description: string;
  baseUrl: string;
  contact: {
    // used for contact page and footer
    street: string; // contact street address
    city: string; // contact city
    zipCode: string; // contact zip code
    province: string; // contact province/state
    country: string; // contact country
    phone: string; // contact phone number
    email: string; // contact email address
  };
  social: {
    // used for social media links in the footer and contact page
    facebook: SocialLink;
    instagram: SocialLink;
    linkedin: SocialLink;
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
// cta
export interface CtaButton {
  ctaButton: {
    text: string;
    href: string;
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
// footer data types
export type FooterData = CtaButton & {
  companyName: string;
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
// marque data types
export type FeatureLightboxMarqueeSectionData = Pick<Section, "title"> & {
  images: Image["image"][];
};


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



export interface CtaCardCenterSectionData extends Section, CtaButton {}

// --------------------------------------------------------
// site settings types
export interface SiteSettingsProps {
  useViewTransitions?: boolean;
  useAnimations?: boolean;
}

export type ImageType = Image['image']
