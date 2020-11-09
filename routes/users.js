let express = require('express');
let router = express.Router();
const usersRepository = require('../data/user')
const verifytoken = require('../middlewares/verifyToken')

/* GET users listing. */
router.get('/', verifytoken.verifyingToken, async function (req, res, next) {
  const dataUsers = await usersRepository.getAllUsers()
  res.status(200).json(dataUsers);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const userById = await usersRepository.getUserById(id);
  res.status(200).json(userById)



})

// createUser
router.post('/register', async (req, res) => {
  const email = req.body.email;
  const verifyUserFinded = await usersRepository.findByEmail(email);
  const userBody = req.body;
  if (verifyUserFinded != null) {
    res.status(400).send("Este Usuario Ya Existe");
  } else {
    try {
      const result = await usersRepository.createUser(userBody);
      console.log(result.insertedCount);
      if (result.insertedCount == 1) {
        res.status(200).send(`Te registraste correctamente, este es tu ID de usuario : ${result.insertedId},
        Bienvenido ${userBody.username}, inicia sesion con tu Email y Password para Obtener un Token`)
      }
    } catch (err) {
      res.status(500).send(`Error al registrarse verifique que todo este bien ${err}`);
    }

  }
});



//Login User
router.post('/login', async (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
  const user = usersRepository.findByEmail(email);

  if (!user) {
    return res.status(404).send(`No existe un usuario con este Email : ${email}`)
  }

  const passToValid = await usersRepository.confirmLoginUserPass(email, pass);
  if (!passToValid) {
    return res.status(404).send('Error en el login')
  }
  const token = await usersRepository.generateToken(user);
  res.status(200).json({ autorizacion: true, token: token, mensaje: 'Sesion Iniciada' })





})

module.exports = router;
