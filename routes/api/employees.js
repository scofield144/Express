const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController.js");
const verifyJWT = require("../../middleware/verifyJWT");

router.route("/")
  .get(verifyJWT,employeesController.getAllEmployees)
  .post(employeesController.createNewEmployee)
  .put(employeesController.updateEmployee)
  .delete( employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployeeById);

module.exports = router;
