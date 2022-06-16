const express = require('express');
const bodyParser = require('body-parser');
const fs = require('./fs-utils');
const authUser = require('./auth-middleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  try {
    const talker = await fs.getTalkers();
    return response.status(HTTP_OK_STATUS).json(talker);
  } catch (e) {
    return response.status(500).end();
} 
});

app.get('/talker/:id', async (request, response) => {
  try {
    const talker = await fs.getTalkers();
    const { id } = request.params;
    const talk = talker.find((r) => r.id === Number(id));
    if (!talk) {
      return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return response.status(HTTP_OK_STATUS).json(talk);
  } catch (e) {
    return response.status(500).end();
} 
});

app.post('/login', authUser, (request, response) => {
    const { email, password } = request.body;

    if (email && password) {
    const token = fs.randomToken();

    return response.status(HTTP_OK_STATUS).json({ token });
    }
});

app.listen(PORT, () => {
  console.log('Online');
});
