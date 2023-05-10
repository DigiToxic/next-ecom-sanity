import { PortableTextBlock } from "sanity";

export type Project = {
  _id: string;

  _createAt: Date;

  name: string;

  slug: string;

  image: string;

  url: string;

  price: string;
  
  category: string;

  content: PortableTextBlock[];

  description: PortableTextBlock[];

  delivery: PortableTextBlock[];

  returns: PortableTextBlock[];

  productinformation: PortableTextBlock[];
};
