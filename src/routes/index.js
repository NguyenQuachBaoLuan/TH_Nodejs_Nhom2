const userRoute = require('./user');
const productRoute = require('./product');
function route(app) {
    app.use('/user', userRoute)
    app.use('/', productRoute)
}
module.exports = route