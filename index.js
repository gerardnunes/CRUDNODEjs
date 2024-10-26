const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyparser = require("body-parser");
const post = require('./models/Post');


app.engine("handlebars", handlebars.engine({ defaultLayout: 'main' }));
app.set("view engine", 'handlebars');


app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


app.get("/cad", function (req, res) {
    res.render('home');
});


app.get('/', function (req, res) {
    post.findAll({ order: [['id', 'DESC']] })
        .then(function (posts) {
            const plainPosts = posts.map(post => post.get({ plain: true }));
            res.render('home', { posts: plainPosts });
        })
        .catch(function (error) {
            console.error("Erro ao buscar posts:", error);
            res.send("Erro ao buscar posts: " + error);
        });
});


app.get("/delete/:id", function (req, res) {
    post.destroy({ where: { 'id': req.params.id } })
        .then(function () {
            res.redirect('/');
        })
        .catch(function (erro) {
            res.send("Erro: " + erro);
        });
});


app.post("/add", function (req, res) {
    post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function () {
        res.redirect('/');
    }).catch(function (erro) {
        res.send("Erro: " + erro);
    });
});


app.get('/edit/:id', async (req, res) => {
    const postId = req.params.id;
    
    try {
        const postData = await post.findOne({ where: { id: postId } });
        
        if (postData) {
            res.render('home', { post: postData.get({ plain: true }) });
        } else {
            res.status(404).send("Post não encontrado");
        }
    } catch (error) {
        console.error("Erro ao buscar o post:", error);
        res.status(500).send("Erro ao buscar o post");
    }
});


app.post('/edit/:id', async (req, res) => {
    const postId = req.params.id;
    const { titulo, conteudo } = req.body;

    try {
        await post.update(
            { titulo, conteudo },
            { where: { id: postId } }
        );
        res.redirect('/');
    } catch (error) {
        console.error("Erro ao atualizar o post:", error);
        res.status(500).send("Erro ao atualizar o post");
    }
});

app.listen(8081, function () {
    console.log("Servidor rodando em http://localhost:8081");
});


