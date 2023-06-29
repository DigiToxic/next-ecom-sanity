"use client";

import { useEffect, useState } from "react";
import { getProjects } from "@/sanity/sanity-utils";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Project } from "@/types/Project";
import useCart from "../useCart";

const Home: React.FC = () => {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSortOption, setSelectedSortOption] = useState(
    "Price - Low to High"
  );
  const { addToCart } = useCart();

  const sortProjects = (projects: Project[], sortOption: string) => {
    let sortedProjects;

    switch (sortOption) {
      case "Price - High to Low":
        sortedProjects = [...projects].sort(
          (a, b) =>
            parseFloat(b.price.substring(1)) - parseFloat(a.price.substring(1))
        );
        break;
      case "Price - Low to High":
        sortedProjects = [...projects].sort(
          (a, b) =>
            parseFloat(a.price.substring(1)) - parseFloat(b.price.substring(1))
        );
        break;
      case "Newest":
        sortedProjects = [...projects].sort(
          (a, b) =>
            new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
        );
        break;
      default:
        sortedProjects = projects;
    }

    return sortedProjects;
  };

  useEffect(() => {
    let filtered =
      selectedCategory === "All"
        ? allProjects
        : allProjects.filter(
            (project) => project.category === selectedCategory
          );

    filtered = sortProjects(filtered, selectedSortOption);
    setFilteredProjects(filtered);
  }, [selectedCategory, selectedSortOption, allProjects]);

  useEffect(() => {
    const fetchProjects = async () => {
      const fetchedProjects = await getProjects();
      setAllProjects(fetchedProjects);
      setFilteredProjects(fetchedProjects);
    };
    fetchProjects();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="shop-page-container">
      <h1 className="ShopTitle">Shop All Items</h1>
      <div className="sort-options-container">
        <button
          className="sort-btn"
          onClick={() => handleCategoryChange("All")}
        >
          All
        </button>
        <button
          className="sort-btn"
          onClick={() => handleCategoryChange("Paints")}
        >
          Paints
        </button>
        <button
          className="sort-btn"
          onClick={() => handleCategoryChange("Figurines")}
        >
          Figurines
        </button>
        <select
          className="sort-btn sort-btn-select"
          value={selectedSortOption}
          onChange={(e) => {
            setSelectedSortOption(e.target.value);
            const filtered = sortProjects(filteredProjects, e.target.value);
            setFilteredProjects(filtered);
          }}
        >
          <option>Price - Low to High</option>
          <option>Price - High to Low</option>
          <option>Newest</option>
        </select>
      </div>
      <div className="shop-product-range">
      {filteredProjects.map((project) => {
  return (
    <div className="w-1/4 mb-10" key={project._id}>
      <Link href={`/projects/${project.slug}`} key={project._id}>
        {project.images && project.images[0] && (
          <img
            className="product-img cursor-pointer"
            src={project.images[0].url}
            alt={project.images[0].alt}
          />
        )}
      </Link>
      <div className="mt-4 product-words">
        <div>
          <p className="text-base w-36">{project.name}</p>
        </div>
        <div className="product-btns flex flex-col">
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
          <p className="flex justify-end text-sm">{project.price}</p>
        </div>
      </div>
    </div>
  );
})}

      </div>
    </div>
  );
};

export default Home;
