import {TOKEN_ROLE} from "./authProviders";

const inventoryManagerCanNotAccess = () => {
    const roles = localStorage.getItem(TOKEN_ROLE) || "USER";
    return roles.includes("INVENTORY_MANAGER");
}

export const listResourceApi = [
    {
        name: "category/parent",
        list: "/category/parent",
        create: "/category/parent/create",
        edit: "/category/parent/edit/:id",
        show: "/category/parent/show/:id",
        meta: {
            label: "Parent Category",
            canDelete: true,
            parent: "Product Attributes",
        },
    },
    {
        name: "category",
        list: "/category",
        create: "/category/create",
        edit: "/category/edit/:id",
        show: "/category/show/:id",
        meta: {
            label: "Category",
            canDelete: true,
            parent: "Product Attributes",
        },
    },
    {
        name: "category-product",
        list: "/category-product",
        meta: {
            label: "Category - Product",
            canDelete: true,
            parent: "Product Attributes",
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
            label: "Product",
            parent: "Products",
        },
    },
    {
        name: "productItem",
        list: "/productItem",
        create: "/productItem/create",
        edit: "/productItem/:id/edit",
        meta: {
            canDelete: true,
            label: "Product Item",
            parent: "Products",
        },
    },
    {
        name: "user",
        list: "/user",
        create: "/user/create",
        edit: "/user/:id/edit",
        meta: {
            canDelete: true,
            label: "User Info",
            parent: "User",
            hide: inventoryManagerCanNotAccess()
        },
    },
    {
        name: "variation",
        list: "/variation",
        create: "/variation/create",
        edit: "/variation/:id/edit",
        meta: {
            canDelete: true,
            label: "Variation",
            parent: "Product Attributes",
        },
    },
    {
        name: "variationValue",
        list: "/variationValue",
        create: "/variationValue/create",
        meta: {
            canDelete: true,
            label: "Variation Value",
            parent: "Product Attributes",
        },
    },
    {
        name: "order",
        list: "/order",
        create: "/order/create",
        meta: {
            canDelete: true,
            label: "Order",
            parent: "Order",
            hide: inventoryManagerCanNotAccess()
        },
    },
    {
        name: "orderDetail",
        list: "/orderDetail",
        meta: {
            canDelete: true,
            label: "Order Detail",
            parent: "Order",
            hide: inventoryManagerCanNotAccess()
        },
    },
];