const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    title: String,
    product_category_id: {
      type: String,
      default: ""
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    featured: String,
    position: Number,
    slug: {
      type: String,
      slug: "title", // Lấy value của title cho vào URL
      unique: true
    },
    createdBy: {
      account_id: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    },
    deleted: {
      type: Boolean,
      default: false
    },
    updatedBy: [
      {
        account_id: String,
        updatedAt: Date
      }
      // Co nhieu nguoi update nen can cho vao mang
    ],
    deletedBy: {
      account_id: String,
      deletedAt: Date
    }
}, {
  timestamps: true
});

const Product = mongoose.model("Product", productSchema, "products")

module.exports = Product;