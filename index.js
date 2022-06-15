const express = require('express');
const bodyParser = require('body-parser');
const talkersFs = require('./fs-utils');
// const talker = require('./talker.json');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

console.log(talkersFs.getTalkers());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  try {
    const talker = await talkersFs.getTalkers();
    console.log(talker);
    return response.status(HTTP_OK_STATUS).json(talker);
  } catch (e) {
    return response.status(500).end();
} 
});

app.listen(PORT, () => {
  console.log('Online');
});
