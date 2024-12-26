const Cart = require("../../models/cart_model");
const Product = require("../../models/product_model");
const productHelper = require("../../helpers/products");

// [GET] /cart
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;
  const cart = await Cart.findOne({
    _id: cartId
  });
  
  if (cart.products.length > 0) {
    for (const item of cart.products) {
      const productId = item.product_id;
      const productInfo = await Product.findOne({
        _id: productId,
      }).select("title thumbnail slug price discountPercentage")

      productInfo.priceNew = productHelper.priceNewProduct(productInfo);
      item.productInfo = productInfo;
      item.totalPrice = productInfo.priceNew * item.quantity;
    }
  }
  cart.totalPrice = cart.products.reduce((sum, item) => 
    sum + item.totalPrice, 0)
  // console.log(cart.totalPrice);

  res.render('client/pages/cart/index', {
    pageTitle: "Giỏ hàng",
    cartDetail: cart
  })
}

// [POST] /cart/:productId
module.exports.add = async (req, res) => {
  const productId = req.params.productId;
  const quantity = parseInt(req.body.quantity);
  const cartId = req.cookies.cartId;

  const cart = await Cart.findOne({
    _id: cartId
  })
  // console.log(cart.products);

  const existProductInCart = cart.products.find(item => item.product_id == productId);
  // console.log(existProductInCart)

  if (existProductInCart) {
    const quantityNew = quantity + existProductInCart.quantity;
    await Cart.updateOne({
      _id: cartId,
      "products.product_id": productId
    }, {
      $set: {
        "products.$.quantity": quantityNew
      }
    })
  } else {
    const objectCart = {
      product_id: productId,
      quantity: quantity
    }

    await Cart.updateOne({
      _id: cartId
    },
      {
        $push: { products: objectCart }
      }
    )
  }
  req.flash('success', 'Đã thêm sản phẩm vào giỏ hàng')
  res.redirect('back');
}

// [GET] cart/delete/:productId
module.exports.delete = async (req, res) => {
  const cartId = req.cookies.cartId;
  const productId = req.params.productId;
  // console.log(productId)

  await Cart.updateOne({
    _id: cartId
  }, {
    $pull: { products: { product_id: productId } }
  })

  // Cách 2: update cart sử dụng findById
  // const cart = await Cart.findById(cartId);
  // const indexProduct = cart.products.findIndex(dataIndex => dataIndex.product_id === productId);
  // cart.products.splice(indexProduct, 1);
  // await cart.save()

  req.flash("success", "Đã xóa sản phẩm thành công");
  res.redirect('back');
}

// [GET] cart/update/:productId/:quantity
module.exports.update = async (req, res) => {
  const cartId = req.cookies.cartId;
  const productId = req.params.productId;
  const quantity = req.params.quantity;

  await Cart.updateOne({
    _id: cartId,
    "products.product_id": productId
  }, {
    $set: {
      "products.$.quantity": quantity
    }
  });

  req.flash("success", "Cập nhật số lượng thành công");
  res.redirect('back');
}