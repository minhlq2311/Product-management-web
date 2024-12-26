const ProductCategory = require('../../models/product-category_model');
const systemConfig = require('../../config/system');
const createTreeHelper = require('../../helpers/createTree');

//[GET] /admin/products-category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  }

  const records = await ProductCategory.find(find);
  const newRecords = await createTreeHelper.tree(records);
  // console.log(newRecords);

  res.render("admin/pages/products-category/index", {
    titlePage: "Danh mục sản phẩm",
    records: newRecords
  })
}

//[GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false
  };

  const records = await ProductCategory.find(find);
  const newRecords = await createTreeHelper.tree(records);
  res.render("admin/pages/products-category/create", {
    titlePage: "Tạo danh mục sản phẩm",
    records: newRecords
  })
}

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  const permissions = res.locals.role.permissions;
  if(permissions.includes('product-category_create')) {
    if(req.body.position === "") {
        const count = await ProductCategory.countDocuments();
        req.body.position = count + 1;
      } else {
        req.body.position = parseInt(req.body.position);
      }
      
    const record = new ProductCategory(req.body);
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  } else {
    res.send("No Permission");
    return;
  }

  
}

// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
  
  const data = await ProductCategory.findOne({ _id : id, deleted: false })
  const records = await ProductCategory.find({
    deleted: false
  });
  const newRecords = await createTreeHelper.tree(records);


  res.render("admin/pages/products-category/edit", {
    titlePage: "Chỉnh sửa sản phẩm",
    data: data,
    records: newRecords
  });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  }
}

// [PATCH] /admin/products-categorty/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.position = parseInt(req.body.position);
  await ProductCategory.updateOne({ _id: req.params.id }, req.body);
  req.flash('success', "Cập nhật danh mục thành công");
  res.redirect('back');
}

// [GET] /admin/products-category/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id
    }
    const category = await ProductCategory.findOne(find);

    res.render("admin/pages/products-category/detail", {
      titlePage: "Chi tiết danh mục sản phẩm",
      category: category
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
}

// [DELETE] /admin/products-category/delete/:id
module.exports.deleteCategory = async (req, res) => {
  await ProductCategory.updateOne(
    {_id: req.params.id}, 
    {
      deleted: true,
      deletedAt: new Date()
    }
  );
  req.flash("success", "Đã xóa thành công");
  res.redirect("back");
}