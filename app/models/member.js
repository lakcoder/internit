module.exports = function (sequelize, Sequelize) {
    var member = sequelize.define('member',{
        memberId:{
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        memberName:{
            type: Sequelize.STRING,
            notEmpty: true
        },
        memberEmail:{
            type: Sequelize.STRING,
            validate:{
                isEmail: true
            },
            notEmpty: true
        },
        memberPhone:{
            type: Sequelize.STRING,
            validate:{
                is : ["^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*"]
            },
            notEmpty: true

        }

    });
    return member
}