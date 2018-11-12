var exports = module.exports = {};
//importing models
var models = require("../models");
var nodemailer = require('nodemailer');
var mailerhbs = require('nodemailer-express-handlebars');
//load bcrypt
var bCrypt = require('bcrypt-nodejs');
var auth = require("../config/config.json")['auth'];




var generateHash = function(password) {

    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

};

var sendMail = function(to,subject, template, context){

    var Config = {
        host: 'sharedlinux.cloudhostdns.net',
        port: 465,
        secure: true, // use TLS
        auth: {
            user: auth.user,
            pass: auth.pass
        }
    };


    var transporter = nodemailer.createTransport(Config);

    transporter.use('compile', mailerhbs({
        viewPath: 'app/views/emails', //Path to email template folder
        extName: '.hbs' //extendtion of email template
    }));

    var mailOptions = {
      from: auth.user,
      to: to,
      subject: subject,
      template: template,
      context: context
    };


    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });


};

// exports.sen = function(req, res){
//     sendMail("sagarbansal099@gmail.com", "Verify Your Email","verify_email", {"name":"Sagar", "otp":"1223"});
// }


exports.home = function(req, res) {

    res.render('index');

};


exports.register = function(req, res) {
    req.session['nit'] = 1;
    res.render('register');

};

exports.registerother = function(req, res){
    req.session['nit'] = 0;
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

exports.verify = function (req, res) {
    res.render('verify', {"email": req.session['email']});
};


exports.registeringnit = function (req, res) {

    var post = req.body;
    var teamname = post.teamname;
    var organisation = post.organisation;
    var teamemail = post.teamemail;
    var number = post.number;
    var password = post.password;


    if(!number){
        res.render('register', {"message":"Minimum two members required"});
    }

    else if(password.length < 8){
        res.render('register', {"message":"Minimum 8 digit password"});
    }
    else if(teamname && organisation && teamemail && number && password){

        console.log(req.body);
        var flag = 1;
        for(var i=1; i<= number; i++){

            var name = post['membername' + i];
            var email = post['memberemail' + i];
            var phone = post['memberphone' + i];
            if(!name || !email || !phone){
                flag = 0;
                break;
            }
        }

        if(flag==1){

            var Team = models.team;
            Team.findOne({
                where: {
                    teamEmail: teamemail
                }
            }).then(function(team) {

                if (team) {

                    res.render('register', {"message":"Team Email is already registerd!"});

                }
                else {

                    var teampassword = generateHash(password);

                    var teamdata = {

                        teamName: teamname,
                        teamEmail: teamemail,
                        college: organisation,
                        isPaid:0,
                        isRone:0,
                        isRtwo:0,
                        isRthree:0,
                        isNit:1,
                        password:teampassword

                    };

                    // creating new team..
                    Team.create(teamdata).then(function(newTeam, created) {

                        // Creating Members
                        for(var i=1; i<= number; i++){
                            var name = post['membername' + i];
                            var email = post['memberemail' + i];
                            var phone = post['memberphone' + i];

                            var memberdata ={
                                memberName : name,
                                memberEmail: email,
                                memberPhone: phone
                            };

                            var Member = models.member;
                            Member.create(memberdata).then(function(newMember, created){


                                var TeamMember = models.team_member;

                                TeamMember.create({teamfk:newTeam.teamId, memberfk: newMember.memberId}).catch(function(err){

                                    res.render('register', {"message":err});

                                });


                            }).catch(function(err){
                                res.render('register', {"message":"Can't Create :"+err});

                            });


                        }

                        //Send email to the team and then redirects to the page.
                        req.session['email'] = teamemail;
                        req.session['name'] = teamname;
                        var random = Math.floor(100000 + Math.random() * 900000);
                        req.session['otp'] = random;
                        sendMail(teamemail, "Verify Your Email","verify_email", {"name":teamname, "otp":random});
                        res.redirect("/verify");




                    }).catch(function (reason) {
                        res.render('register', {"message":"Something Went Wrong: "+reason});
                    });





                }

            });

            // res.render('ques');
        }
        else{
            res.render('register', {"message":"Member Details can't be empty"});
        }

    }
    else{
        res.render('register', {"message":"Kindly Fill the form correctly"});
    }

};

exports.registering = function (req, res) {

    var post = req.body;
    var teamname = post.teamname;
    var organisation = post.organisation;
    var teamemail = post.teamemail;
    var number = post.number;
    var password = post.password;


    if(!number){
        res.render('registerother', {"message":"Minimum two members required"});
    }

    else if(password.length < 8){
        res.render('registerother', {"message":"Minimum 8 digit password"});
    }
    else if(teamname && organisation && teamemail && number && password){

        console.log(req.body);
        var flag = 1;
        for(var i=1; i<= number; i++){

            var name = post['membername' + i];
            var email = post['memberemail' + i];
            var phone = post['memberphone' + i];
            if(!name || !email || !phone){
                flag = 0;
                break;
            }
        }

        if(flag==1){

            var Team = models.team;
            Team.findOne({
                where: {
                    teamEmail: teamemail
                }
            }).then(function(team) {

                if (team) {

                    res.render('registerother', {"message":"Team Email is already registerd!"});

                }
                else {

                    var teampassword = generateHash(password);

                    var teamdata = {

                        teamName: teamname,
                        teamEmail: teamemail,
                        college: organisation,
                        isPaid:0,
                        isRone:0,
                        isRtwo:0,
                        isRthree:0,
                        isNit:0,
                        password:teampassword

                    };

                    // creating new team..
                    Team.create(teamdata).then(function(newTeam, created) {

                        // Creating Members
                        for(var i=1; i<= number; i++){
                            var name = post['membername' + i];
                            var email = post['memberemail' + i];
                            var phone = post['memberphone' + i];

                            var memberdata ={
                                memberName : name,
                                memberEmail: email,
                                memberPhone: phone
                            };

                            var Member = models.member;
                            Member.create(memberdata).then(function(newMember, created){


                                var TeamMember = models.team_member;

                                TeamMember.create({teamfk:newTeam.teamId, memberfk: newMember.memberId}).catch(function(err){

                                    res.render('registerother', {"message":err});

                                });


                            }).catch(function(err){
                                res.render('registerother', {"message":"Can't Create :"+err});

                            });


                        }

                        //Send email to the team and then redirects to the page.
                        req.session['email'] = teamemail;
                        req.session['name'] = teamname;
                        var random = Math.floor(100000 + Math.random() * 900000);
                        req.session['otp'] = random;
                        sendMail(teamemail, "Verify Your Email","verify_email", {"name":teamname, "otp":random});
                        res.redirect("/verify");


                    }).catch(function (reason) {
                        res.render('registerother', {"message":"Something Went Wrong: "+reason});
                    });


                }

            });

            // res.render('ques');
        }
        else{
            res.render('registerother', {"message":"Member Details can't be empty"});
        }

    }
    else{
        res.render('registerother', {"message":"Kindly Fill the form correctly"});
    }

};



exports.verifyotp = function (req, res) {

    //if requested for OTP again...
    if(req.query.otp == 'resend'){
        //Send email to the team and then redirects to the page.
        var teamemail = req.session['email'];
        var teamname = req.session['name'];
        var random = Math.floor(100000 + Math.random() * 900000);
        //updates the OTP session
        req.session['otp'] = random;
        if(teamemail && teamname){
            sendMail(teamemail, "Verify Your Email","verify_email", {"name":teamname, "otp":random});
            req.session['resend'] = "New OTP sent!";
        }

        req.session['resend'] = "Invalid Request!";
        res.redirect("/verify");
    }
    else if(req.query.otp == req.session['otp']){

        var email = req.session.email;
        var Team = models.team;
        Team.findOne({
                where: {
                    teamEmail: email
                }
            }).then(function(team) {
                if(team){
                    var pass = team.password;

                    var Login = models.login;

                    Login.create({loginEmail: email, loginPassword:pass}).then(function (value) {
                        delete req.session.otp;
                        delete req.session.resend;
                        delete req.session.email;
                        delete req.session.name;
                        req.session['login'] = "Thank You for registering with us!. You can procced by Login below";
                        res.redirect("/login");
                    }).catch(function (err) {
                        req.session['resend'] = "Invalid Request!";
                        res.redirect("/verify");
                    });


                }
        }).catch(function(err){
            req.session['resend'] = "Invalid Request!" + err;
            res.redirect("/verify");
        });


    }
    else{
        req.session['resend'] = "Kindly Enter the valid OTP";
        res.redirect("/verify");
    }

};