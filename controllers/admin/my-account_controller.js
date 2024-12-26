const Account = require('../../models/account_model');
const md5 = require('md5');
// [GET] /admin/my-account
module.exports.index = (req, res) => {
  res.render("admin/pages/my-account/index", {
      titlePage: "Trang thông tin cá nhân"
  });
}

// [GET] /admin/my-account-edit
module.exports.edit = async (req, res) => {
  res.render("admin/pages/my-account/edit", {
    titlePage: "Chỉnh sửa trang cá nhân",
  });
}

// [PATCH] /admin/my-account-edit
module.exports.editPatch = async (req, res) => {
  const id = res.locals.user.id;
  const emailExist = await Account.findOne({
    _id: {$ne: id}, //ne: not equal. Tìm những bản ghi khác id kia
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
    await Account.updateOne({ _id: id }, req.body);
    req.flash('success', "Cập nhật thành công");
  }

  res.redirect('back');
}