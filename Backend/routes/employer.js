// Frameworks
const express = require("express");
// Permissions
const verifyToken = require("../permissions/verifyToken");
// Data model
const UserData = require("../models/DB/UserData");

const router = express.Router();

// Get all availabel employees
router.get("/", verifyToken, async (req, res) => {
  UserData.find({ employerId: req.user._id })
    .populate("employeeId", "-password -__v")
    .select("-__v")
    .then((usersData) => {
      return res.status(200).json(usersData);
    })
    .catch((err) => {
      if (err) return res.status(500).json(err);
    });
});

module.exports = router;
