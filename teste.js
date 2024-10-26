const Sequelize = require("sequelize")
const sequelize = new Sequelize("user", 'root', '0929942gG', {
    host: "localhost",
    dialect: "mysql"
})


sequelize.authenticate().then(function(){
    console.log("conectado com sucesso")
}).catch(function(erro){
    console.log("falha"+erro)
})

const postagem = sequelize.define("post", {
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
})

//postagem.sync({force: true})

postagem.create({
    titulo: "qualquwr minha rola",
    conteudo: "acaba com os mestres conselheiros"

})