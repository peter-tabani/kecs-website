export type GalleryCategory = {
  slug: string;
  label: string;
  blurb: string;
  fallbackImage: string;
};

export const galleryCategories: GalleryCategory[] = [
  {
    slug: "campus-facilities",
    label: "Campus & Facilities",
    blurb: "Our classrooms, grounds, and the buildings that make up daily life at KES.",
    fallbackImage: "/images/hero/kecs-gate.webp",
  },
  {
    slug: "academics-classroom",
    label: "Academics & Classroom",
    blurb: "Learners at work, from ECDE up to Junior Secondary.",
    fallbackImage: "/images/programs/junior.jpg",
  },
  {
    slug: "sports-talent",
    label: "Sports & Talent",
    blurb: "Athletics, Taekwondo, Scouting and music.",
    fallbackImage: "/images/programs/primary.jpg",
  },
  {
    slug: "events-celebrations",
    label: "Events & Celebrations",
    blurb: "Prize-giving days, school events, and moments worth celebrating.",
    fallbackImage: "/images/programs/islamic.jpg",
  },
  {
    slug: "community-outreach",
    label: "Community & Outreach",
    blurb: "The KES family, sponsored and fee-paying learners side by side.",
    fallbackImage: "/images/programs/ecde.jpg",
  },
  {
    slug: "staff-leadership",
    label: "Staff & Leadership",
    blurb: "The teachers and staff who run the school day to day.",
    fallbackImage: "/images/staff/director.png",
  },
];

export function getCategoryBySlug(slug: string): GalleryCategory | undefined {
  return galleryCategories.find((c) => c.slug === slug);
}
