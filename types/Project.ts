import { PortableTextBlock } from "sanity";

export type Project = {
  _id: string;

  _createdAt: Date;

  name: string;

  slug: string;

  images: { url: string; alt: string }[];

  url: string;

  price: string;
  
  category: string;

  content: PortableTextBlock[];

  description: PortableTextBlock[];

  delivery: PortableTextBlock[];

  returns: PortableTextBlock[];

  productinformation: PortableTextBlock[];
};
