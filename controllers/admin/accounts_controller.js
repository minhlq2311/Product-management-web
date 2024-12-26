const Account = require('../../models/account_model');
const systemConfig = require('../../config/system');
const md5 = require('md5');
const Role = require('../../models/roles_model');

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
  
  let find = {
    deleted: false
  };

  const accounts = await Account.find(find).select('-password -token');
  for (const record of accounts) {
    const role = await Role.findOne({
      _id: record.role_id,
      deleted: false
    });
    record.role = role;
  }

  res.render("admin/pages/accounts/index", {
    titlePage: "Danh sách sản phẩm",
    records: accounts
  });
}

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
  const roles = await Role.find({
    deleted: false
  })
  res.render("admin/pages/accounts/create", {
    titlePage: "Danh sách tài khoản",
    roles: roles
  });
}

// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
  const emailExist = await Account.findOne({
    email: req.body.email,
    deleted: false
  });

  if(emailExist) {
    req.flash('error', "Email đã tồn tại");
    res.redirect('back');
  } else {
    req.body.password = md5(req.body.password);
    const record = new Account(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
}

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  let find = {
    _id: req.params.id,
    deleted: false
  }

  try {
    const data = await Account.findOne(find);
    const roles = await Role.find({
      deleted: false
    });
    res.render("admin/pages/accounts/edit", {
      pageTitle: "Chỉnh sửa tài khoản",
      data: data,
      roles: roles
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/accounts`)
  }
}

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  const emailExist = await Account.findOne({
    _id: {$ne: req.params.id}, //ne: not equal. Tìm những bản ghi khác id kia
    email: req.body.email,
    deleted: false
  });

  if(emailExist) {
    req.flash('error', "Email đã tồn tại");
  } else {
    if(req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }
    await Account.updateOne({ _id: req.params.id }, req.body);
    req.flash('success', "Cập nhật thành công");
  }
  res.redirect('back');
}

// [GET] /admin/accounts/detail/:id
module.exports.detail = async (req, res) => {
  const id = req.params.id;
  const account = await Account.findOne({
    _id: id,
    deleted: false
  })
  res.render('admin/pages/accounts/detail', {
    account: account
  });
}

// [DELETE] /admin/accounts/delete/:id
module.exports.deleteAccount = async (req, res) => {
  const id = req.params.id;

  await Account.updateOne({
    _id: id
  },
  {
    deleted: true,
    deletedAt: new Date()
  });
  res.redirect('back');
}