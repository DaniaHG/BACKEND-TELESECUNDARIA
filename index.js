const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());

app.use(cors());

app.set('port', process.env.PORT || 3000);

app.use(require('./routes/docentes'));
app.use(require('./routes/materias'));
app.use(require('./routes/periodos'));
app.use(require('./routes/alumnos'));
app.use(require('./routes/materia_docente'));
app.use(require('./routes/entrega_tareas'));
app.use(require('./routes/materia_alumno'));
app.use(require('./routes/usuarios'));
app.use(require('./routes/asistencias'));

app.use(require('./routes/security'));

app.listen(app.get('port'), () => {
    console.log(`Server en puerto ${app.get('port')}`);
});