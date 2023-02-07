const jwt = require("jsonwebtoken");

const users = [
  { id: 1, username: "user1", password: "Password1" },
  { id: 2, username: "user2", password: "Password2" },
];

export default function handler(req, res) {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized");
  }
  const token = bearer.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = users.find((user) => user.id === decoded.sub);
    res.json({ username: user.username });
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
}
