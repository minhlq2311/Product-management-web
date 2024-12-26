const Product = require('../../models/product_model');

module.exports.deletedProducts = async (req, res) => {
  let find = {
    deleted: true
  };
  const product = await Product.find(find)

  res.render("admin/pages/deletedProducts/index", {
    titlePage: "Danh sách các sản phẩm bị xóa",
    products: product
  });
}