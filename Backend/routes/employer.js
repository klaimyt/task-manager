// Frameworks
const express = require("express");
// Permissions
const verifyToken = require("../permissions/verifyToken");
const { canAccessEmployerData } = require('../permissions/authorization')
// Data model
const Relationship = require("../models/DB/Relationship");

const router = express.Router();

// Get all availabel employees
router.get("/:employerId", verifyToken, canAccessEmployerData, (req, res) => {
  Relationship.find({ employerId: req.params.employerId })
    .populate("employeeId", "-password -__v")
    .select("-__v")
    .then((relationships) => {
      return res.status(200).json(relationships);
    })
    .catch((err) => {
      if (err) return res.status(500).json(err);
    });
});

module.exports = router;
