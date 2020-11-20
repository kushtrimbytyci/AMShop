const router = require("express").Router();
const {
  register,
  login,
  getMe,
  updateUser,
  getAllUsers,
  deleteUser,
  getAdmin,
} = require("../controllers/user");
const { authenticate, authorize } = require("../helpers/auth");


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update/:id").put(authenticate, authorize("admin"),updateUser);
router.route("/getme").get(authenticate, getMe);
router.route("/getallusers").get(authenticate, authorize("admin"), getAllUsers);
router.route("/deleteuser/:id").delete(authenticate, authorize("admin"), deleteUser);

module.exports = router;
