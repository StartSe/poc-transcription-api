import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
app.use(express.json());
const PORT = 3333;

app.use(cors());

app.get('/', (request, response) => {
    const filename = 'default';
    const data = fs.readFileSync(`public/${filename}.txt`, 'utf8');
    response.write(data);
    response.end();
});

app.post('/file', (request, response) => {
    const filename = 'default';
    const { transcription = '' } = request.body;

    fs.writeFile(`public/${filename}.txt`, '\ufeff' + transcription, 'utf8', function (err) {
        if (err) throw err;
    });
      
    return response.status(201).send('');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})