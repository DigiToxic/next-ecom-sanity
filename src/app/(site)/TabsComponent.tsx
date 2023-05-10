"use client";

import React, { useState } from "react";
import { PortableText } from "@portabletext/react";

type TabsComponentProps = {
  project: {
    description: any;
    delivery: any;
    returns: any;
    productinformation: any;
  };
};

const TabsComponent: React.FC<TabsComponentProps> = (
  props: TabsComponentProps
) => {
  const { project } = props;
  const [activeText, setActiveText] = useState("description");

  const renderActiveText = () => {
    switch (activeText) {
      case "description":
        return <PortableText value={project.description} />;
      case "delivery":
        return <PortableText value={project.delivery} />;
      case "returns":
        return <PortableText value={project.returns} />;
      case "productinformation":
        return <PortableText value={project.productinformation} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="pop-up-btns-container">
        <button
          className={`description-btn ${
            activeText === "description" ? "active-tab-btn" : "inactive-tab"
          }`}
          onClick={() => setActiveText("description")}
        >
          Description
        </button>
        <button
          className={`delivery-btn ${
            activeText === "delivery" ? "active-tab-btn" : "inactive-tab"
          }`}
          onClick={() => setActiveText("delivery")}
        >
          Delivery
        </button>
        <button
          className={`returns-btn ${
            activeText === "returns" ? "active-tab-btn" : "inactive-tab"
          }`}
          onClick={() => setActiveText("returns")}
        >
          Returns
        </button>
        <button
          className={`product-info-btn ${
            activeText === "productinformation"
              ? "active-tab-btn"
              : "inactive-tab"
          }`}
          onClick={() => setActiveText("productinformation")}
        >
          Product Information
        </button>
      </div>
      <div className="pop-up-paras-container">
        <div className={`active-tab description-para`}>
          {renderActiveText()}
        </div>
      </div>
    </div>
  );
};

export default TabsComponent;
