const app = require('./app');
const pool = require('./config/bd');

const PORT = process.env.PORT || 3000;

pool.connect((err)=>{
    if(err){
        console.log('Error al conectar la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos de PostgreSQL correctamente');
    }
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});