export default {
    name: "banner",
    title: "Banner",
    type: "document",
    fields: [
        {
            name: "image",
            title: "Image",
            type: "image"
        },
        {
            name: "product",
            title: "Product",
            type: "string"
        },
        {
            name: "buttonText",
            title: "ButtonText",
            type: "string"
        },
        {
            name: "desc",
            title: "Description",
            type: "string"
        },
        {
            name: "midText",
            title: "MidText",
            type: "string"
        },
        {
            name: "smallText",
            title: "SmallText",
            type: "string"
        },
        {
            name: "bigText",
            title: "BigText",
            type: "string"
        },
        {
            name: "discount",
            title: "Discount",
            type: "string"
        },
        {
            name: "saleTime",
            title: "SaleTime",
            type: "string"
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "product",
                maxLength: 90
            }
        }
    ]
};