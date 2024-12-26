const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const settingsGeneralSchema = new mongoose.Schema({
    websiteName: String,
    logo: String,
    phone: String,
    email: String,
    address: String,
    copyright: String
}, {
  timestamps: true
});

const SettingGeneral = mongoose.model("SettingGeneral", settingsGeneralSchema, "settings-general");

module.exports = SettingGeneral;