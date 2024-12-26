const dashboardRouters = require('./dashboard_router.js')
const systemConfig = require("../../config/system.js")
const productRouters = require('./product_router.js');
const deletedProducts = require('./deleted_product_router.js');
const productCategoryRouter = require('./product-category_router.js');
const rolesRouter = require('./roles_router');
const accountsRouter = require('./accounts_router');
const authRouter = require('./auth_router.js');
const authMiddleware = require('../../middlewares/admin/auth_middleware.js');
const myAccountRouter = require('./my-account_router.js');
const SettingGeneral = require('./setting_router.js');

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + '/dashboard', 
      authMiddleware.requireAuth, 
      dashboardRouters
    );
    app.use(PATH_ADMIN + '/products', authMiddleware.requireAuth, productRouters);
    app.use(PATH_ADMIN + '/deleted-products', authMiddleware.requireAuth, deletedProducts);
    app.use(PATH_ADMIN + '/products-category', authMiddleware.requireAuth, productCategoryRouter);
    app.use(PATH_ADMIN + '/roles', authMiddleware.requireAuth, rolesRouter);
    app.use(PATH_ADMIN + '/accounts', authMiddleware.requireAuth, accountsRouter);
    app.use(PATH_ADMIN + '/auth', authRouter);
    app.use(PATH_ADMIN + '/my-account', authMiddleware.requireAuth, myAccountRouter);
    app.use(PATH_ADMIN + '/settings', authMiddleware.requireAuth, SettingGeneral);
}