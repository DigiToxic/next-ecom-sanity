"use client";

import { useState } from "react";
import { getProject, getRelatedProjects } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import TabsComponent from "../../TabsComponent";
import useCart from "../../useCart";

type Props = {
  params: { project: string };
};

const Project = async ({ params }: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();

  const slug = params.project;
  const project = await getProject(slug);
  const relatedProjects = await getRelatedProjects(slug);
  const randomIndex = Math.floor(Math.random() * (relatedProjects.length - 2));
  const nextThreeProjects = relatedProjects.slice(randomIndex, randomIndex + 3);

  return (
    <div className="product-page">
      <div className="product-display">
        <div className="product-imgs">
          <div className="product-pic-slider">
            <img className="slider-img" src={project.image} alt="image" />
          </div>
          <div className="photo-grid">
            <img className="grid-img" src={project.image} alt="image" />
            <img className="grid-img" src={project.image} alt="image" />
          </div>
        </div>
        <div className="purchase-info">
          <p className="product-name">{project.name}</p>
          <p>{project.price}</p>
          <p>Quantity : 1</p>

          <button
            onClick={() =>
              addToCart({
                ...project,
                quantity,
              })
            }
          >
            Add to Cart <i className="fa-solid fa-cart-plus"></i>
          </button>
          <div className="key-features">
            <p className="key-features-title">Key Features</p>
            <ul>
              <li>
                <PortableText value={project.content} />
              </li>
            </ul>
            <p>Find out more</p>
          </div>
        </div>
      </div>

      <hr />
      <div className="suggested-products">
        <p className="suggested-title">We Think You&apos;d Also Like...</p>
        <div className="suggested-products-display">
          {nextThreeProjects.map((project) => (
            <div className="w-1/4 mb-10" key={project._id}>
              <Link
                href={`/projects/${project.slug}`}
                className="w-1/4 mb-10"
                key={project._id}
              >
                <img
                  className="product-img cursor-pointer"
                  src={project.image}
                  alt="image"
                />
              </Link>
              <div className="mt-4 product-words">
                <div>
                  <p>{project.name}</p>
                  <p>{project.price}</p>
                </div>
                <div className="product-btns">
                  <button
                    onClick={() =>
                      addToCart({
                        ...project,
                        quantity: 1,
                      })
                    }
                  >
                    Add to Cart <FontAwesomeIcon icon={faCartPlus} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className="extra-info">
        <div className="pop-up-tabs-container">
          <div className="pop-up-paras-container">
            <div className="description-para active-tab">
              <TabsComponent project={project} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
