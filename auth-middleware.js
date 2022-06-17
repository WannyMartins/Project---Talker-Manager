function authUser(req, res, next) {
  const validEmailre = new RegExp(/\S+@\S+\.\S+/);
  if (!req.body.password) {
  return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } 
  if (!req.body.email) {
   return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (req.body.password.length <= 6) {
   return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  if (!validEmailre.test(req.body.email)) {
   return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
 next();
}

const authToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (authorization.length !== 16) {
        return res.status(401).json({ message: 'Token inválido' });
      }
    return next();
  } catch (error) {
    return res.status(500).end();
  }
};

function authName(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (req.body.name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
}

function authAge(req, res, next) {
  if (!req.body.age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (req.body.age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
}

function authTalk(req, res, next) {
  if (!req.body.talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  if (!req.body.talk.rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
   if (req.body.talk.rate < 1 || req.body.talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
}

  function authWatchedAt(req, res, next) {
    const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

    if (!req.body.talk.watchedAt) {
      return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }

    if (!dateRegex.test(req.body.talk.watchedAt)) {
      return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
     }
  
     next();
  }

module.exports = { authToken, authUser, authName, authAge, authTalk, authWatchedAt };

// referencia do regex para validar email >>>>> https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/