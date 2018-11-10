var exports = module.exports = {};
//importing models
var models = require("../models");
//load bcrypt
var bCrypt = require('bcrypt-nodejs');

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



var generateHash = function(password) {

    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

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
                        isNit:req.session['nit'],
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