var exports = module.exports = {}

exports.home = function(req, res) {

    res.render('index');

};


exports.register = function(req, res) {

    res.render('register');

};

exports.registerother = function(req, res){
    res.render('registerother');
};

exports.login = function(req, res){
    res.render('login');
};

exports.dashboard = function(req,res){
    res.render('dashboard');
};

exports.question = function (req, res) {
    res.render('ques');
};


exports.registering = function (req, res) {
    res.render('ques');
};