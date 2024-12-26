const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

/* Cron Jobs */
const cronJobs = require('./src/jobs/cronJobs');

/* Importamos las rutas */
const mainRoutes = require('./src/router/mainRoutes');
const embedRoutes = require('./src/router/embedRoutes');

/* Config de archivos estáticos */
app.use(express.static('public'));
app.use("/css", express.static("dist"));

/* Configuración de Json */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Configuración de views */
app.set('view engine', 'ejs');
app.set('views', 'src/views');

/* Rutas de la aplicación */
app.use('/', mainRoutes);
app.use('/embed', embedRoutes);

/* Iniciamos el servidor */
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});