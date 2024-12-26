const Product = require('../../models/product_model');
const productsHelper = require('../../helpers/products');

// [GET] /
module.exports.index = async (req, res) => {
  // Lấy ra sản phẩm nổi bật
  const productsFeatured = await Product.find({
    featured: "1",
    deleted: false,
    status: "active"
  }).limit(2);
  const newProductsFeatured = productsHelper.priceNewProducts(productsFeatured);
  // Hết Lấy ra sản phẩm nổi bật

  // Hiển thị danh sách sản phẩm nổi bật
  const productsNew = await Product.find({
    deleted: false,
    status: "active"
  }).limit(6).sort({ position: "desc" });
  const newProductsNew = productsHelper.priceNewProducts(productsNew);
  // Hết hiển thị danh sách sản phẩm nổi bật
  res.render("client/pages/home/index", {
    titlePage: "Trang chủ",
    productsFeatured: newProductsFeatured,
    productsNew: newProductsNew
  }); 
}

//Sau cái exports là tên hàm