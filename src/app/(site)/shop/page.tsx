"use client";

import { useEffect, useState } from "react";
import { getProjects } from "@/sanity/sanity-utils";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Project } from "@/types/Project";
import useCart from "../useCart";
import { ProjectWithQuantity } from "../CartContext";

interface HomeProps {
  addToCart?: (item: ProjectWithQuantity) => void;
}

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
        sortedProjects = [...projects].sort((a, b) => parseFloat(b.price.substring(1)) - parseFloat(a.price.substring(1)));
        break;
      case "Price - Low to High":
        sortedProjects = [...projects].sort((a, b) => parseFloat(a.price.substring(1)) - parseFloat(b.price.substring(1)));
        break;
      case "Newest":
        sortedProjects = [...projects].sort(
          (a, b) =>
            new Date(b._createAt).getTime() - new Date(a._createAt).getTime()
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
          );
        })}
      </div>
    </div>
  );
};

export default Home;
