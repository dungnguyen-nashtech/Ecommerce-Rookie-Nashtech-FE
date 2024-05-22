import {TOKEN_ROLE} from "./authProviders";

const roleCanAccess = (roles: string[]) => {
    const role = localStorage.getItem(TOKEN_ROLE) || "ROLE_USER";
    return roles.includes(role);
}

const ADMIN_INVENTORY_PERMISSION: string[] = ["ROLE_ADMIN, ROLE_INVENTORY_MANAGER"];
const INVENTORY_PERMISSION = ["ROLE_INVENTORY_MANAGER"];
const NO_ACCESS = [""]


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
            parent: "Categories",
            hide: roleCanAccess(ADMIN_INVENTORY_PERMISSION)
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
            parent: "Categories",
            hide: roleCanAccess(ADMIN_INVENTORY_PERMISSION)
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
            hide: roleCanAccess(ADMIN_INVENTORY_PERMISSION)
        },
    },
    {
        name: "productItem",
        list: "/productItem",
        edit: "/productItem/:id/edit",
        meta: {
            canDelete: true,
            label: "Product Item",
            parent: "Products",
            hide: roleCanAccess(ADMIN_INVENTORY_PERMISSION)
        },
    },
];