const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController.js");

router.route("/")
  .get(employeesController.getAllEmployees)
  .post(employeesController.createNewEmployee)
  .put(employeesController.updateEmployee)
  .delete( employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployeeById);

module.exports = router;
