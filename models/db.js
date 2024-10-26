const Sequelize = require("sequelize")


    //conexao com banco
    const sequelize = new Sequelize("postapp", 'root', '0929942gG', {
        host: "localhost",
        dialect: "mysql"
    })
    sequelize.authenticate().then(function(){
        console.log("conectado com sucesso")
    }).catch(function(erro){
        console.log("falha"+erro)
    })


module.exports ={
    Sequelize : Sequelize,
    sequelize : sequelize
}