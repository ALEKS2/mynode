const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');

const port = process.env.PORT || 3000;


app.use(express.static(__dirname +'/public'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('capitizer', (text) => {
    return text.toUpperCase();
});

app.use((request, response, next) => {
    let msg = `url -> ${request.url} and protocal -> ${request.protocol}\n`;
    fs.appendFile('server.log', msg, ($err)=> {
        console.log($err);
    })
    next();
});

// app.use((request, response, next)=> {
//     response.render('mentenance.hbs');
// });

app.get('/', (request, response) => {
    response.render('home.hbs', {
        title: 'home',
        user: {
            username: 'aleks',
            age: 35
        }
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        title: 'ABOUT',
        message: 'Welcome home buddy'
    });
});

app.get('/bad', (request, response) => {
    response.send({
        error: "you are fire mr salimo"
    });
});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});