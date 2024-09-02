export type GalleryEvent = {
  name: string;
  label?: string;
  route: string;
  coverImage: string;
};

export const events: GalleryEvent[] = [
  { name: "Ceremony", route: "/gallery/ceremony", coverImage: "/images/ceremony-1.webp" },
  { name: "Mehndi", route: "/gallery/mehndi", coverImage: "/images/Mehndi-3.webp" },
  {
    name: "Reception",
    label: "Wedding & Reception",
    route: "/gallery/reception",
    coverImage: "/images/reception-1.webp",
  },
  { name: "Personal Photos", route: "/gallery/personal", coverImage: "/images/personal-1.webp" },
];

// Sub-folders of "personal" photos that have people's camera photos in different categories
export const subfolders: GalleryEvent[] = [
  {
    name: "Pre-Events",
    label: "Pre-Wedding Events",
    route: "/gallery/personal/pre-events",
    coverImage: "/images/pre-events.webp",
  },
  {
    name: "Wedding",
    route: "/gallery/personal/wedding",
    coverImage: "/images/personal-wedding.webp",
  },
  { name: "Mehndi", route: "/gallery/personal/mehndi", coverImage: "/images/personal-mehndi.webp" },
  {
    name: "Grenada",
    route: "/gallery/personal/grenada",
    coverImage: "/images/personal-grenada.webp",
  },
];
