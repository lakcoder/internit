var authController = require('../controllers/authcontroller.js');

module.exports = function (app) {

    app.get('/', authController.home);
    app.get('/register',authController.register);
    app.get('/registerother',authController.registerother);
    app.get('/login',authController.login);
    app.get('/dashboard', authController.dashboard);
    app.get('/ques', authController.question);
    app.post('/register',authController.registeringnit);
    app.post('/registerother',authController.registering);
    app.get('/verify',authController.verify);
    app.get('/verify/otp',authController.verifyotp);
    // app.get('/email',authController.sen);
};

