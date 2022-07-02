const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Unauthorised Access" });
  }
  let token = req.headers.authorization.split(" ")[1];
  try {
    let user = jwt.verify(token, "secret");
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorised Access" });
  }
};
