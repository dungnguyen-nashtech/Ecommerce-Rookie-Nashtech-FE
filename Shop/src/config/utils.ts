interface Category {
  id: number;
  name: string;
  description: string;
  parentCategoryName: string;
  createdOn: string;
  lastUpdatedOn: string;
}

interface MenuItem {
  id?: number;
  name: string;
  path: string;
  children?: MenuItem[];
}

export const CreateCategoryMenu = (categories: Category[]) => {
  const result: MenuItem[] = [];
  const categoryMap: { [key: string]: MenuItem } = {};
  categories.forEach(category => {
    if (!categoryMap[category.parentCategoryName]) {
      categoryMap[category.parentCategoryName] = {
        id: category.id,
        name: category.parentCategoryName,
        path: `${category.id}`,
        children: []
      };
      result.push(categoryMap[category.parentCategoryName]);
    }
    categoryMap[category.parentCategoryName].children!.push({
      id: category.id,
      name: category.name,
      path: `${category.id}`
    });
  });

  return result;
};