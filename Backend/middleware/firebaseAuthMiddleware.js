// /home/viggu/Documents/studyabroad-hub/Backend/middleware/firebaseAuthMiddleware.js
const admin = require("firebase-admin");

/**
 * Express middleware to verify Firebase ID token.
 * If the token is valid, it attaches the decoded user info to `req.user`.
 * Otherwise, it sends an unauthorized/forbidden error.
 */
async function firebaseAuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No token provided." });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    // Verifies the token and attaches the decoded user payload to the request.
    req.user = await admin.auth().verifyIdToken(idToken);
    next(); // Proceeds to the next middleware or route handler.
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    return res.status(403).json({ message: "Forbidden: Invalid token." });
  }
}

module.exports = firebaseAuthMiddleware;
