const Product = require("../../models/product_model")
const productsHelper = require('../../helpers/products');
const ProductCategory = require('../../models/product-category_model');
const productCategoryHelper = require('../../helpers/products-category');

// [GET] /products
module.exports.index = async (req, res) => { //Xóa product đi vì ở bên index_router đã có products rồi
  const products = await Product.find({
      status: "active",
      deleted: false
  }).sort({ position: "desc" });

  const newProducts = productsHelper.priceNewProducts(products);

  // console.log(newProducts);
  res.render("client/pages/products/index", {
      titlePage: "Trang danh sách sản phẩm",
      products: newProducts
  });
}

// [GET] /products/:slugProduct
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      slug: req.params.slugProduct,
      status: "active"
    }
    
    const product = await Product.findOne(find);

    if(product.product_category_id) {
      const category = await ProductCategory.findOne({
        _id: product.product_category_id,
        status: "active",
        deleted: false
      });
      product.category = category;
    }

    product.priceNew = productsHelper.priceNewProduct(product);

    res.render("client/pages/products/detail", {
      titlePage: product.title,
      product: product,
    });
  } catch (error) {
    req.flash("error", "No product found");
    res.redirect(`/products`);
  }
}

// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {
  const category = await ProductCategory.findOne({
    slug: req.params.slugCategory,
    status: "active",
    deleted: false
  });

  // Hàm lấy ra các danh mục con
  const listSubCategory = await productCategoryHelper.getSubCategory(category.id); // Phải dùng await
  const listSubCategoryId = listSubCategory.map(item => item.id);
  
  const products = await Product.find({
    product_category_id: { $in: [category.id, ...listSubCategoryId] },
    deleted: false
  }).sort({ position: "desc" })
  
  const newProducts = productsHelper.priceNewProducts(products);

  res.render("client/pages/products/index", {
    titlePage: category.title,
    products: newProducts
  });
}