const { User } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (email, password) => {
  const user = await User.findOne({ where: { email, estado: 1 } })

  if (!user) return { message: "Usuario no encontrado"};

  const isCorrect = await bcrypt.compare(password, user.password);

  if (isCorrect) {
    const { id, name, email, userName, lastName, birthDate, profileImage, role, estado } = user;

    const data = {
      id: id,
      email: email,
      name: name,
      lastName: lastName,
      userName: userName,
      birthDate: birthDate,
      profileImage: profileImage,
      estado: estado,
      role: role

    };

    const token = jwt.sign(data, process.env.SECRET_KEY, {
      expiresIn: '10000h',
    });

    return {
      message: "El usuario inició sesión con éxito",
      user: {
        id,
        email,
        name,
        lastName,
        userName,
        birthDate,
        profileImage,
        token,
        estado,
        role
      },
    };
  }

  else {
    return { message: 'Contraseña incorrecta'};
  }

};

module.exports = { login };
