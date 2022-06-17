const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { getTalkers, setTalkers } = require('./fs-utils');
const { authToken, authUser, authName, 
  authAge, authTalk, authWatchedAt } = require('./auth-middleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.use((req, _res, next) => {
//   console.log('req.method:', req.method);
//   console.log('req.path:', req.path);
//   console.log('req.params:', req.params);
//   console.log('req.query:', req.query);
//   console.log('req.headers:', req.headers);
  // console.log('req.body:', req.body);
  next();
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search', authToken, async (request, response) => {
  try {
    const talker = await getTalkers();
    const { q } = request.query;
    const talk = talker.filter((t) => t.name.includes(q));
    if (!q) {
     return response.status(HTTP_OK_STATUS).json(talker);
    }
    if (!talk) {
      return response.status(HTTP_OK_STATUS).json([]);
    }
    return response.status(200).json(talk);
  } catch (e) {
    return response.status(500).end();
  }
});

app.get('/talker', async (_request, response) => {
  try {
    const talker = await getTalkers();
    return response.status(HTTP_OK_STATUS).json(talker);
  } catch (e) {
    return response.status(500).end();
} 
});

app.get('/talker/:id', async (request, response) => {
  try {
    const talker = await getTalkers();
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

app.post('/login', authUser, (_request, response) => {
  const token = crypto.randomBytes(8).toString('hex');

return response.status(HTTP_OK_STATUS).json({ token });
});

app.post(
  '/talker', 
  authToken, 
  authName, 
  authAge, 
  authTalk,
  authWatchedAt, 
 async (request, response, newTalker) => {
  const { name, age, talk: { watchedAt, rate } } = request.body;
      const talker = await getTalkers();

      const newId = talker.length + 1;

      talker.push({ name, age, id: newId, talk: { watchedAt, rate } });

      await setTalkers(talker, newTalker);

      response.status(201).json({ name, age, id: newId, talk: { watchedAt, rate } });
    },
);

app.put(
  '/talker/:id',
  authToken, 
  authName, 
  authAge, 
  authTalk,
  authWatchedAt, 
  async (request, response) => {
  const { id } = request.params;
  const { name, age, talk: { watchedAt, rate } } = request.body;
  const talker = await getTalkers();

  const editedTalker = talker.map((talk) => {
    if (talk.id === Number(id)) {
      return { name, age, id: Number(id), talk: { watchedAt, rate } };
    }
    return talk;
  });

    await setTalkers(editedTalker);

  return response.status(HTTP_OK_STATUS)
  .json({ name, age, id: Number(id), talk: { watchedAt, rate } });
},
);

app.delete(
  '/talker/:id',
  authToken, 
  async (request, response) => {
  const { id } = request.params;
  const talker = await getTalkers();
  const talkerid = talker.find((talk) => talk.id === Number(id));

  talker.splice(talkerid, 1);
  return response.status(204).end();
  },
);

app.listen(PORT, () => {
  console.log('Online');
});
