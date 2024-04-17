const express = require('express');
const app = express();
const jimp = require('jimp');
const { v4: uuidv4 } = require('uuid');
const port = 3000; //poner puerto por defecto

//levante servidor
app.listen(port, () => { // options.port should be >= 0 and < 65536.
    console.log(`Servidor levantado en puerto ${port}`);
});

//carpeta publica
app.use('/front', express.static(__dirname + '/public'));

//ruta raiz
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

//ruta cargar
app.use('/cargar', async (req, res) => {
    const imagenUrl = req.query.url // const {url: imagenUrl} = req.query <-- captura valor de url en variable de tipo constante url
    try {
        let imagen;
        // console.log(imagenUrl)
        if(imagenUrl.substring(0,4) == 'http'){
         imagen = await jimp.read(imagenUrl);
        }else{
            imagen = await jimp.read(__dirname + `/img/${imagenUrl}`); //dinamico 
        }
        // await jimp.read('', (err, img) => {
        imagen
            .resize(350, jimp.AUTO) //tamaño
            .greyscale() //grises
            .writeAsync(`procesadas/${uuidv4().slice(0, 6)}.jpeg`)
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
