const express = require("express");
const router = express.Router();
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/role_list");

const employeesController = require("../../controllers/employeesController.js");
// const verifyJWT = require("../../middleware/verifyJWT");

// .get(verifyJWT,employeesController.getAllEmployees) employeesController.createNewEmployee
router.route("/")
  .get(employeesController.getAllEmployees)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createNewEmployee)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
  .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployeeById);

module.exports = router;
