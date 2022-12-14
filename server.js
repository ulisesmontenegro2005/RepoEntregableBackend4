const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

const router = express.Router();

const productos = [];



// inicio 


router.get('/productos', (req, res) => {
    res.json(productos);
})


// obtener producto por id


router.get('/productos/:id', (req, res) => {
    if (productos.find(el => el.id == req.params.id) == undefined) {
        res.json({error: 'producto no encontrado'})
    }

    productos.find(obj => {
        if (obj.id == req.params.id) {
            res.json(obj)
        }
    })
})


// agregar producto


router.post('/productos', (req, res) => {
    let id = productos.length + 1

    while (productos.find(el => el.id == id) != undefined) {
        id++
    }

    productos.push({
        id: id,
        ...req.body
    })
    res.json({estado: 'enviado correctamente'})
})


// modificar por id


router.put('/productos/:id', (req, res) => {
    if (productos.find(el => el.id == req.params.id) == undefined) {
        res.json({error: 'producto no encontrado'})
    }

    const productoAnterior = productos[req.params.id - 1];
    productos[req.params.id - 1] = {
        id: productos[req.params.id - 1].id,
        ...req.body
    };

    res.json({anterior: productoAnterior, actualizado: productos[req.params.id - 1]});
})


// delete por id


router.delete('/productos/:id', (req, res) => {
    if (productos.find(el => el.id == req.params.id) == undefined) {
        res.json({error: 'producto no encontrado'})
    }

    const productoEliminado = productos.splice(req.params.id - 1, 1);

    res.json({productoEliminado: productoEliminado})
})


// formulario html post


router.get('/form', (req, res) => {

    res.sendFile(__dirname + '/public/index.html')

})


// fin

app.use('/api', router);

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log('servidor escuchando en el ' + PORT)
})