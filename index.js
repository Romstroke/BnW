const express = require('express');
const app = express();
const jimp = require('jimp');
// const uuid = require('uuid');
const { v4: uuidv4 } = require('uuid')

//levante servidor
app.listen(4000, () => {
    console.log('servidor en puerto 4mil');
});

//carpeta publica
app.use(express.static(__dirname + 'public'));

//ruta raiz
app.get('/', (req, res) => {

});

//ruta cargar
app.use('/cargar', async (req, res) => {
    try {
        const imagen = await jimp.read(__dirname + '/color.jpg');
        // await jimp.read('', (err, img) => {
        imagen
            .resize(350, jimp.AUTO) //tamaño
            .greyscale() //grises
            .writeAsync(`${uuidv4().slice(0, 6)}.jpg`)
        // });
        // Convertir la imagen a buffer
        imagen.getBuffer(jimp.MIME_JPEG, (err, buffer) => {
            if (err) {
                throw err;
            }

            // Configurar el encabezado de respuesta
            res.set('Content-Type', jimp.MIME_JPEG);

            // Enviar la imagen redimensionada como respuesta
            res.send(buffer);
        });

        // res.setHeader('Content-Type', 'image/jpeg')
    } catch (error) {
        // Manejar errores
        console.error('Error al procesar la imagen:', error);
        res.status(500).send('Error interno del servidor');
    }
});