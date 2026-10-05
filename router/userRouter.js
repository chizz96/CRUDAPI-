const express = require("express");
const router = express.Router();

const { allusers, newUser, getOneUser,  updateUser, deleteUser } = require("../controller/user")



router.get("/alluser", allusers);

router.post("/newuser", newUser);

router.get("/user/:id", getOneUser)

router.patch("/updateUser/:id", updateUser)

router.delete("/deleteUser/:id", deleteUser)

module.exports = router