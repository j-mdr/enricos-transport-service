export type DataTranslationType<T> = {
  en: T;
  nl: T;
};

// site data types
export type SiteDataProps = {
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
};

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

// --------------------------------------------------------
// faq data types
export type FaqAccordionSectionData = {
  title: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

// --------------------------------------------------------
// testimonial data types
export type TestimonialData = {
  title: string;
  testimonials: {
    avatar: ImageMetadata; // an imported image
    name: string;
    title: string;
    testimonial: string;
  }[];
};

// --------------------------------------------------------
// team data types
type TeamMeber = {
  image: ImageMetadata; // an imported image
  name: string;
  title: string;
  bio: string;
};

export type TeamMemberCardsSectionData = {
  title: string;
  teamMembers: TeamMeber[];
};

// --------------------------------------------------------
// heroSideImage data types
export interface heroSideImageSectionData {
  title: string;
  description: string;
  image: ImageMetadata;
  imageAlt: string;
}

// --------------------------------------------------------
// servicesSideImage data types
export type ServicesSideImageSectionData = {
  title: string;
  items: {
    image: ImageMetadata;
    imageAlt: string;
    title: string;
    details: string;
    href: string;
  }[];
};

// --------------------------------------------------------
// site settings types
export type SiteSettingsProps = {
  useViewTransitions?: boolean;
  useAnimations?: boolean;
};
