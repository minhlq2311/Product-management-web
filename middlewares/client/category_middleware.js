module.exports.category = async (req, res, next) => {
  const ProductCategory = require('../../models/product-category_model');
  const createTreeHelper = require('../../helpers/createTree');
  const productCategory = await ProductCategory.find({
    deleted: false
  });

  const newProductCategory = createTreeHelper.tree(productCategory);
  res.locals.layoutsProductsCategory = newProductCategory;
  next();
}