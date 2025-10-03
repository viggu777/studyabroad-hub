const express = require("express");
const admin = require("firebase-admin");
const User = require("../models/User"); // Assuming you have a User model

const router = express.Router();

/**
 * @route   POST /api/auth/login
 * @desc    Login or Register a user, verify Firebase ID token
 * @access  Public
 */
router.post("/login", async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res
      .status(401)
      .json({ message: "Authentication token is required." });
  }

  try {
    // 1. Verify the ID token sent from the client
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    // 2. Find or create a user in your MongoDB database
    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      user = new User({
        firebaseUid: uid,
        email: email,
        name: name,
        profilePicture: picture,
        // You can add more fields here as needed
      });
      await user.save();
    }

    // 3. Here you would create a session for the user.
    // For simplicity, we'll just send back the user data.
    // In a real app, you would use something like JWT or express-session
    // to create a session token and send it back to the client.
    console.log(`User ${email} authenticated successfully.`);

    // For now, we send back a success message and user info.
    // TODO: Replace this with proper session management (e.g., JWT).
    res.status(200).json({
      message: "Authentication successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error verifying auth token:", error);
    res
      .status(403)
      .json({ message: "Authentication failed.", error: error.message });
  }
});

module.exports = router;
