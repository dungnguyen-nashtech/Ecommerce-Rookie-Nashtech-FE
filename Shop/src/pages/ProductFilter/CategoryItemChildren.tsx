import React from "react";
import { IItemCategory } from "./index.tsx";
import { Minus, Plus } from "lucide-react";

interface ICategoryItemChildren {
  item: IItemCategory,
  itemChildren?: IItemCategory[]
}

const CategoryItemChildren = ({ item, itemChildren }: ICategoryItemChildren) => {
  const [openItem, setOpenItem] = React.useState<boolean>(false);
  return (
    <li className="category-item">
      <div className="category-item-handle">
                <span>
                    {item.name}
                </span>
        {
          item.children && (
            <span onClick={() => setOpenItem(r => !r)} className="icon">
                            {
                              !openItem ? (
                                <Plus size={18} />
                              ) : (
                                <Minus size={18} />
                              )
                            }
                        </span>
          )
        }
      </div>
      {
        item.children && (
          <ul className={`category-item-children ${openItem && "active"}`}>
            {
              itemChildren?.map((child: IItemCategory) => (
                <li key={child.id}>
                  {child.name}
                </li>
              ))
            }
          </ul>
        )
      }

    </li>
  );
};
export default CategoryItemChildren;