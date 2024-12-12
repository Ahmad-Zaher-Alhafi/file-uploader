const { PrismaClient } = require("@prisma/client");
const userRouter = require("../routes/userRouter");

const prisma = new PrismaClient();

exports.addUser = async (req, res) => {
  const { username, password, fullName } = req.body;
  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
      fullName: fullName,
    },
  });

  if (!user) {
    throw new Error("User could not be added");
  }

  res.render("upload", { user });
};

exports.getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return user;
};

exports.getUserByUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  return user;
};
