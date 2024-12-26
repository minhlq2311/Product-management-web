const ProductCategory = require('../models/product-category_model');

module.exports.getSubCategory =  (parentId) => {
  const getCategory = async (parentId) => {
    const subs = await ProductCategory.find({
      parent_id: parentId,
      status: "active",
      deleted: false
    });
    let allSub = [...subs];
    for (const sub of subs) {
      const children = await getCategory(sub.id);
      allSub = allSub.concat(children);
    }
    return allSub;
  }

  const result = getCategory(parentId);
  return result;
}
