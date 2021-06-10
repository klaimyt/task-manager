// Frameworks
const express = require("express");
// Permissions
const verifyToken = require("../permissions/verifyToken");
const { canAccessEmployerData } = require('../permissions/authorization')
// Data model
const UserData = require("../models/DB/UserData");

const router = express.Router();

// Get all availabel employees
router.get("/:employerId", verifyToken, canAccessEmployerData, (req, res) => {
  UserData.find({ employerId: req.params.employerId })
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
