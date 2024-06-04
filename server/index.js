const server = require('./src/app.js');
const {database} = require ('./src/db')
const puerto = 3002;

//force:true elimina todas las tablas y las vuelve a crear
//alter:true actuliza las tablas
//force:false no elimina ni cambia nada

database.sync({ alter: true }).then(() => {
    server.listen(puerto, () => {
      console.log(`Servidor escuchando en el puerto ${puerto}`);
    });
  });