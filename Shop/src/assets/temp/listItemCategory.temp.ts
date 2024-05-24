import { IItemCategory } from "../../components/ProductFilter/LayoutProductFilter";

export const listCategory: IItemCategory[] = [
  {
    name: "Sản phẩm mới",
    path: ""
  },
  {
    name: "Sản phẩm hay mua",
    path: ""
  },
  {
    name: "Áo nữ",
    path: "",
    children: [
      {
        name: "Áo thun nữ",
        path: ""
      },
      {
        name: "Áo sơ mi nữ",
        path: ""
      }, {
        name: "Áo kiểu nữ",
        path: ""
      }
    ]
  },
  {
    name: "Áo nữ",
    path: "",
    children: [
      {
        name: "Áo thun nữ",
        path: ""
      },
      {
        name: "Áo sơ mi nữ",
        path: ""
      }, {
        name: "Áo kiểu nữ",
        path: ""
      }
    ]
  }
];