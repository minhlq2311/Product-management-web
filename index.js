const express = require('express'); 
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const router = require('./routers/client/index_router');
const routerAdmin = require('./routers/admin/index_router');
const flash = require('express-flash');
const path = require('path');
const multer = require('multer');
const moment = require('moment');
const app = express(); 
const http = require('http');
const server = http.createServer(app);

const systemConfig = require("./config/system.js");
require("dotenv").config();
const port = process.env.PORT || 3000;
const database = require("./config/database");

database.connect();
app.use(methodOverride('_method'));

// Socket.io
const { Server } = require('socket.io');
const io = new Server(server);
global._io = io;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/public`));

// Flash
app.use(cookieParser("123"));
app.use(session({
    secret: 'sherlock@2311',        // <-- THÊM secret
    resave: false,                    // <-- THÊM resave
    saveUninitialized: true,          // <-- THÊM saveUninitialized
    cookie: { maxAge: 60000 }
}));
app.use(flash());
// End flash

// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// End TinyMCE

// App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

// Routers
routerAdmin(app);
router(app);

// 404 Page
app.get("*", (req, res) => {
    res.render("client/pages/errors/404", {
        pageTitle: "404 Not Found"
    });
});

server.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});

// Nếu file package.json bị sửa thì phải chạy lại server, dù có nodemon hay ko
