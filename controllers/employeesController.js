const data = {
  employees: require("./../data/employees.json"), // Importing employee data
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const createNewEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees.length
      ? data.employees[data.employees.length - 1].id + 1
      : 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  if (newEmployee.firstName || newEmployee.lastName) {
    return res
      .status(400)
      .json({ message: "First and last names are required." });
  }
  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
  const employeeId = parseInt(req.params.id, 10);
  const employee = data.employees.find((emp) => emp.id === employeeId);
  if (!employee) {
    return res
      .status(404)
      .json({ message: `Employee ID ${employeeId} not found.` });
  }
  const updatedEmployee = {
    ...employee,
    firstName: req.body.firstName || employee.firstName,
    lastName: req.body.lastName || employee.lastName,
  };
  data.setEmployees(
    data.employees.map((emp) => (emp.id === employeeId ? updatedEmployee : emp))
  );
  res.json(updatedEmployee);
};

const deleteEmployee = (req, res) => {
    console.log("Deleting employee with ID:", req.body.id);
    
  const employeeId = parseInt(req.body.id, 10);
  const employeeIndex = data.employees.findIndex(
    (emp) => emp.id === employeeId
  );
  if (employeeIndex === -1) {
    return res
      .status(404)
      .json({ message: `Employee ID ${employeeId} not found.` });
  }
  data.setEmployees(data.employees.filter((emp) => emp.id !== employeeId));
  res.json({ message: `Employee ID ${employeeId} deleted.` });
};

const getEmployeeById = (req, res) => {
  const employeeId = parseInt(req.params.id, 10);
  const employee = data.employees.find((emp) => emp.id === employeeId);
  if (!employee) {
    return res
      .status(404)
      .json({ message: `Employee ID ${employeeId} not found.` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
};
