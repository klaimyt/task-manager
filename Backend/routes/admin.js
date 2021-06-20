// Frameworks
const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
//Premissions
const verifyToken = require("../permissions/verifyToken");
const {
  registerValidation,
  passwordValidation,
} = require("../permissions/validation");
const { isAdmin } = require("../permissions/authorization");
// Data model
const ROLE = require("../models/Role");
const Relationship = require("../models/DB/Relationship");
const User = require("../models/DB/User");
// functions
const { deleteRelationship } = require("./functions");

const router = express.Router();

//Get all users
router.get("/", verifyToken, isAdmin, async (req, res) => {
  const query = await User.find({}).select("-password -__v");
  res.status(200).json(query);
});

// Search for employer by name or username from request query.
router.get("/search", verifyToken, isAdmin, (req, res) => {
  const query = req.query.q;
  const role = req.query.role;
  if (!Object.values(ROLE).includes(role)) {
    return res.status(400).json({ error: "Bad Role" });
  }

  User.find({
    $and: [
      { role: role },
      {
        $or: [
          { name: { $regex: query, $options: "i" } },
          { username: { $regex: query, $options: "i" } },
        ],
      },
    ],
  })
    .select("-password -__v")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ error: "Bad query" });
    });
});

// Create new user
router.post("/createUser", verifyToken, isAdmin, async (req, res) => {
  // Validating input data
  const { error } = registerValidation(req.body);
  if (!Object.values(ROLE).includes(req.body.role))
    return res.status(400).json({ error: "Bad Role" });
  if (error) return res.status(400).json({ error: error.details[0].message });
  // Throw error if username already exists
  if (await User.findOne({ username: req.body.username }))
    return res.status(400).json({ error: "Username already exsists" });

  // Encrypt password
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: err });

  // Creating user object
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      username: req.body.username,
      password: hash,
      role: req.body.role,
    });

  // Save user to db
    newUser
      .save()
      .then((result) => {
        res.status(201).send("User created");
      })
      .catch((error) => res.status(500).json({ error: error }));
  });
});

// Change user password
router.patch("/:userId/changePassword", verifyToken, isAdmin, (req, res) => {
  //Validate password
  const { error } = passwordValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  // Finding user
  User.findOne({ _id: req.params.userId })
    .exec()
    .then((user) => {
      //creating password hash
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: err });

        user.password = hash;
        // Saving new password
        user
          .save()
          .then(res.status(200).send())
          .catch((error) => res.status(500).json(error));
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

// Delete user
router.delete("/:userId", verifyToken, isAdmin, (req, res) => {
  // Search user by id
  Relationship.find(
    {
      $or: [
        { employeeId: req.params.userId },
        { employerId: req.params.userId },
      ],
    },
    (err, relationship) => {
      if (err) return res.status(500).send();
      if (!relationship) return res.status(404).send();
      // Deleting relationship. If you won't delete user, might happen memory leak (Losing of all pointers to exsisted object)
      // Delete all Rel also deleting all tasks that user have because of the same reason.
      deleteRelationship(relationship, res);
    }
  );
  // Deleting user
  User.findByIdAndDelete(req.params.userId, (err, result) => {
    if (err) return res.status(404).json(err);
    res.json(result);
  });
});

// Get all relationships
router.get("/relationship", verifyToken, isAdmin, (req, res) => {
  Relationship.find((err, relationships) => {
    if (err) return res.status(500).json(err);
    res.json(relationships);
  }).select("-__v");
});

// Create new relationship
router.post("/relationship", verifyToken, isAdmin, async (req, res) => {
  // Check if relationship exsists
  let relationship;
  try {
    relationship = await Relationship.findOne({
      employeeId: req.body.employeeId,
      employerId: req.body.employerId,
    });
    if (relationship) return res.status(409).json({error: 'Relationship already exists'});
  } catch (err) {
    res.status(500).json({error: "Internal Server Error"});
  }
  // Creating new Relationship
  const newRelationship = new Relationship({
    employeeId: req.body.employeeId,
    employerId: req.body.employerId,
  });

  // Saving
  newRelationship
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Delete relationship
router.delete("/relationship/:id", async (req, res) => {
  await deleteRelationship(req.params.id, res);
  res.send();
});

module.exports = router;
