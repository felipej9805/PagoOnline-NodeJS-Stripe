const express = require('express');
const expbhs = require('express-handlebars');
const path = require('path');

//Inicializaciones
const app = express();

//Settings
app.set('views', path.join(__dirname, 'views'));


app.engine('.hbs', expbhs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middleware
/**
 * Para que el servidor soporte json
 * Podamos recibir desde el servidor, datos que vienen desde el servidor
 */
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

//Routes
app.use(require('./routes/index'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Start Server
app.listen(3000, () => {
    console.log('Server on port', 3000);
})