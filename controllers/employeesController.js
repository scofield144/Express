const Employee = require("./../model/Employee");

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
if(!employees) return res.status(204).json({'message':'No employees found'});
  res.json(employees);
};

const createNewEmployee = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) return res.status(400).json({'message':'First and last name are required'})
    
    try{
      const result = await Employee.create({
        firstname: req.body.firstName,
        lastname: req.body.lastName
      });
      
      res.status(201).json(result);
    }catch(err) {
      console.error(err);

    }
};

const updateEmployee = async (req, res) => {
  
  if (!req?.body?.id) {
    return res
      .status(400)
      .json({ message: `ID parameter is required.` });
  }
  const employee = await Employee.findOne({_id: req.body.id}).exec();
  if (!employee) return res.status(204).json({'message':'ID parameter is required'});
  if(!req.body?.firstName) employee = req.body.firstName;
  if(!req.body?.lastName) employee = req.body.lastName;
  
  const result = await employee.Save();
  res.json(result);
};

const deleteEmployee = async (req, res) => {
  if (req?.body?.id) return res.status(400).json({'message':'Employee ID is required'});
  const employeeID = Employee.findOne({_id:req.body.id}).exec();
  if (!employeeID) return res.status(204).json({'message':`No employee match ID ${re.body.id}`});
  const result = await employeeID.deleteOne();
  res.json(result);
};

const getEmployeeById = (req, res) => {
  if(!req?.params?.id) return res.status(400).json({'message':'Employee ID is required'});
  const employeeID = Employee.findOne({_id: req.body.id}).exec();
  if (!employeeID) return res.status(204).json({'message':`No employee match ID ${re.body.id}`});

  res.json(employeeID);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
};
