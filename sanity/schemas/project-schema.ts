const project = {
  name: "project",

  title: "Product listed",

  type: "document",

  fields: [
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Paints", value: "Paints" },
          { title: "Figurines", value: "Figurines" },
        ],
      },
    },
    {
      name: "name",
      title: "Product Name",
      type: "string",
    },
    {
      name: "slug",
      title:
        "Slug (You need to Generate it everytime you change your Product Name)",
      type: "slug",
      options: { source: "name" },
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    },
    {
      name: "url",
      title: "URL",
      type: "url",
    },
    {
      name: "price",
      title: "Price",
      type: "string",
    },
    {
      name: "content",
      title: "Key Features",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "delivery",
      title: "Delivery",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "returns",
      title: "Returns",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "productinformation",
      title: "Product Information",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};

export default project;
