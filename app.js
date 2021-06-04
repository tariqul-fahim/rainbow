/**
 * NODEJS API
 * DATABASE MONGODB
 * VERSION 1.0.0
 * POWERED BY SOFTLAB IT
 * DEVELOP BY MD IQBAL HOSSEN
 */
const express = require("express");
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config()

// Cross Unblocked File..
const cors = require('cors');
const errorHandler = require('./middileware/error-handler');

/**
 *  Router File Import
 */
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const subCategoryRoutes = require('./routes/sub-category');
const authorRoutes = require('./routes/author');
const publisherRoutes = require('./routes/publisher');
const bookRoutes = require('./routes/book');
const productRoutes = require('./routes/product');
const bazaarRoutes = require('./routes/bazaar');
const uploadRoutes = require('./routes/upload');
const cartRoutes = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout');
const orderRoutes = require('./routes/order');
const shopRoutes = require('./routes/shop');
const homeRoutes = require("./routes/home");
const reviewRoutes = require("./routes/reviews");
const testRoutes = require('./routes/test');
const wishlistRoutes = require('./routes/wishlist');
const couponRoutes = require('./routes/coupon');
const horizontalSubRoutes = require('./routes/horizontalSub');
const companyRoutes = require('./routes/company');
const tagRoutes = require('./routes/tag');
const newsletterRoutes = require('./routes/newsletter');
const rewardRoutes = require("./routes/reward");


/**
 * MAIN APP CONFIG
 * REPLACE BODY PARSER WITH EXPRESS PARSER
 */

const app = express();
app.use(express.json());
app.use(cors())


/**
 * IMAGE UPLOAD STATIC DIR
 */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


/**
 * MAIN BASE ROUTER WITH IMPORTED ROUTES
 */
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/sub-category', subCategoryRoutes);
app.use('/api/author', authorRoutes);
app.use('/api/publisher', publisherRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/product', productRoutes);
app.use('/api/bazaar', bazaarRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/shop', shopRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/reviews", reviewRoutes);
app.use('/api/test', testRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/coupon', couponRoutes);
app.use('/api/horizontalSub', horizontalSubRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/tag', tagRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use("/api/reward",rewardRoutes);

/**
 * MAIN BASE GET PATH
 */
app.get('/', (req, res) => {
    res.send('<div style="width: 100%; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center"><h1 style="color: blueviolet">API RUNNING...</h1><p style="color: lightcoral">Powered by SOFTLAB IT TEAM</p></div>')
})


/**
 * Error Handler
 * 401 UnAuthorized, Access Denied
 * 406 Already Exists, Not Acceptable
 * 404 Not Found
 * 422 Input Validation Error, Unprocessable Entity
 * 500 Database Operation Error, Internal Server Error
 */
app.use(errorHandler.route);
app.use(errorHandler.next);


/**
 * NODEJS SERVER
 * PORT CONTROL
 * MongoDB Connection
 * IF PASSWORD contains @ then encode with https://meyerweb.com/eric/tools/dencoder/
 * Database Name roc-ecommerce
 * User Access authSource roc-ecommerce
 */
mongoose.connect(
    `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017/${process.env.DB_NAME}?authSource=${process.env.AUTH_SOURCE}`,
    // `mongodb://localhost:27017/${process.env.DB_NAME}`,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
)
    .then(() => {
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`Server is running at port:${port}`));
        console.log('Connected to mongoDB');

    })
    .catch(err => {
        console.error('Oops! Could not connect to mongoDB Cluster0', err);
    })
