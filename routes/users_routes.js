const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/field-validations");
const {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
} = require("../controllers/users_controller");
const {
  isValidRole,
  emailExists,
  userExistsById,
} = require("../helpers/db-validators");

const router = Router();

// CRUD routes
router.get("/", getUsers);
router.put(
  "/:id",
  [
    check("id", "Not a valid ID").isMongoId(),
    check("id").custom(userExistsById),
    validateFields,
  ],
  putUsers
);
router.post(
  "/",
  [
    check("name", "Name is mandatory").not().isEmpty(),
    check("password", "Password must have 6 characters or more").isLength({
      min: 6,
    }),
    check("email", "Email is not valid").isEmail(),
    check("email").custom(emailExists),
    check("role").custom(isValidRole),
    validateFields,
    // check("role", "Not a valid role").isIn(["ADMIN_ROLE", "USER_ROLE"]),
  ],
  postUsers
);
router.patch("/", patchUsers);
router.delete("/", deleteUsers);

module.exports = router;
