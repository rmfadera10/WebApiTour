var db = require('../config/dbConfig.js')
var user = db.sequelize.define('users',{
    id:{
        type:db.Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    imageLocation:{
        type:db.Sequelize.TEXT,
        allowNull:false
    }
},{
    freezeTableName:true,
    tablesName:"image"
});

user.sync({force:false})
.then(function(){
})
.catch(function(err){
    console.log(err);
});
module.exports=user;