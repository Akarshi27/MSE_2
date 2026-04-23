const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // 1. Get Authorization header
    const authHeader = req.header("Authorization");

    // 2. Check if header exists
    if (!authHeader) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // 3. Check Bearer format
    // Expected: "Bearer TOKEN"
    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ msg: "Invalid token format" });
    }

    // 4. Extract token
    const token = parts[1];

    // 5. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 6. Attach user ID to request
    req.user = decoded.id;

    // 7. Continue to next middleware/controller
    next();

  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};