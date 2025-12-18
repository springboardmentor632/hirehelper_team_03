import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "please_change_this_secret";

const protect = (req, res, next) => {
  const header = req.headers.authorization || req.headers.Authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

export default protect;
