export default {
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        {
            name: "image",
            title: "Image",
            type: "array",
            of: [{ type: "image" }],
            options: {
                hotspot: true
            }
        },
        {
            name: "name",
            title: "Name",
            type: "string"
        },
        {
            name: "price",
            title: "Price",
            type: "number"
        },
        {
            name: "details",
            title: "Details",
            type: "string"
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 90
            }
        },
        {
            name: "category",
            title: "Category",
            type: "array",
            of: [{ type: "string" }]
        },
        {
            name: "discount",
            title: "Discount (percentage)",
            type: "number",
        }
    ]
};
