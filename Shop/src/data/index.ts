import { IHeaderItem } from "../payloads/interface/formInput.ts";

export const listHeaderItem: IHeaderItem[] = [
  {
    name: "Trang chủ",
    path: "/"
  },
  {
    name: "Thời trang nữ",
    path: "/",
    children: [
      {
        name: "Áo thun nữ",
        path: ""
      },
      {
        name: "Áo thun nữ",
        path: ""
      },
      {
        name: "Áo thun nữ",
        path: ""
      },
      {
        name: "Áo thun nữ",
        path: ""
      }
    ]
  },
  {
    name: "Bộ sưu tập ",
    path: "",
    children: [
      {
        name: "Áo thun nữ",
        path: ""
      },
      {
        name: "Áo thun nữ",
        path: ""
      },
      {
        name: "Áo thun nữ",
        path: ""
      },
      {
        name: "Áo thun nữ",
        path: ""
      }
    ]
  },
  {
    name: "Tin tức thời trang",
    path: "",
    children: [
      {
        name: "Áo thun nữ",
        path: ""
      },
      {
        name: "Áo thun nữ",
        path: ""
      },
      {
        name: "Áo thun nữ",
        path: ""
      },
      {
        name: "Áo thun nữ",
        path: ""
      }
    ]
  },
  {
    name: "Trợ giúp",
    path: ""
  },
  {
    name: "Khuyến mãi",
    path: ""
  }
];