export const listResourceApi = [
    {
        name: "category",
        list: "/category",
        create: "/category/create",
        edit: "/category/edit/:id",
        show: "/category/show/:id",
        meta: {
            label: "Category",
            canDelete: true,
        },
    },

    {
        name: "productItem",
        list: "/productItem",
        edit: "/productItem/:id/edit",
        meta: {
            canDelete: true,
            label: "Product Items"
        },
    },
    {
        name: "product",
        list: "/product",
        create: "/product/create",
        edit: "/product/:id/edit",
        show: "/product/show/:id",
        meta: {
            canDelete: true,
            label: "Product"
        },
    },
    {
        name: "category/parent",
        list: "/category/parent",
        create: "/category/parent/create",
        edit: "/category/parent/edit/:id",
        show: "/category/parent/show/:id",
        meta: {
            label: "Parent Category",
            canDelete: true,
        },
    },
];