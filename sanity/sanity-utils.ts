import { createClient, groq } from "next-sanity";
import { Project } from "@/types/Project";
import clientConfig from "./config/client-config";

export async function getProjects(): Promise<Project[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project"]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "images": images[].asset->{url, metadata { alt }}, // updated line
      url,
      content,
      price,
      description,
      delivery,
      returns,
      productinformation,
      category
    }`
  );
}

export async function getProject(slug: string): Promise<Project> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "images": images[].asset->{url, metadata { alt }}, // updated line
      url,
      content,
      price,
      description,
      delivery,
      returns,
      productinformation,
      category
    }`,
    { slug }
  );
}

export async function getRelatedProjects(
  currentProjectSlug: string
): Promise<Project[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project" && slug.current != $currentProjectSlug] | order(_createdAt) {
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "images": images[].asset->{url, metadata { alt }}, // updated line
      url,
      content,
      price,
      description,
      delivery,
      returns,
      productinformation,
      category
    }`,
    { currentProjectSlug }
  );
}
