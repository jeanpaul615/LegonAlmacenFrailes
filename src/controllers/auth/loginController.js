const Login = require('../../crud/auth/Login');

exports.login = (req, res) => {
    const { username, password } = req.body;

    Login.login(username, password, (err, result) => {
        if (err) {
            res.status(500).send('Error en el servidor');
        } else {
            res.status(200).json(result); 
        }
    });
};

exports.checkAdmin = (req, res) => {
  try {
    const { username } = req.body;

    Login.checkAdmin(username, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error en el servidor' });
      }

      if (result.message) {
        return res.status(404).json({ error: result.message });
      }

      res.status(200).json(result);
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
  