export interface Feature {
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  image?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CTASection {
  title: string;
  description: string;
  primary: string;
  secondary: string;
}

export interface FooterSection {
  contact: string;
  legal: string;
  rights: string;
}

export interface FeaturesSection {
  analysis: Feature;
  translation: Feature;
  riskColoring: Feature;
  summaries: Feature;
  history: Feature;
}

export interface TestimonialsSection {
  title: string;
  items: Testimonial[];
}

export interface FAQSection {
  title: string;
  items: FAQItem[];
}

export interface Translation {
  title: string;
  subtitle: string;
  cta: CTASection;
  features: FeaturesSection;
  testimonials: TestimonialsSection;
  faq: FAQSection;
  footer: FooterSection;
}

// Type-safe translation key paths
export type TranslationKey = keyof Translation |
  `${keyof Translation}.${string}` |
  `${keyof Translation}.${string}.${string}`;

// Utility type to get nested value types
export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
  ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
  : `${Key}`;
}[keyof ObjectType & (string | number)];

export type TranslationPath = NestedKeyOf<Translation>;

// Type to get the value type for a given path
export type PathValue<T, P extends string> =
  P extends keyof T
  ? T[P]
  : P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
  ? PathValue<T[K], Rest>
  : never
  : never;

export type TranslationValue<P extends TranslationPath> = PathValue<Translation, P>;

// Helper type for translation values
export type TranslationValueType = string | number | boolean | Testimonial[] | FAQItem[] | Feature[];

// Specific path value types
export type TestimonialItems = Testimonial[];
export type TestimonialTitle = string; 