const jwt = require("jsonwebtoken");

const users = [
  { id: 1, username: "user1", password: "Password1" },
  { id: 2, username: "user2", password: "Password2" },
];

export default function handler(req, res) {
  console.log("api/login body: ", req.body);

  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username or password cannot be empty." });
  }

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(400).json({ message: "Invalid username or password." });
  }

  console.log("process.env.SECRET_KEY", process.env.SECRET_KEY);
  
  const token = jwt.sign({ sub: user.id, data: user }, process.env.SECRET_KEY);

  console.log("token", token);

  res.status(200).json({ token: `${token}` });
}
