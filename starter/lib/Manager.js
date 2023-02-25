// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("../lib/Employee");
class Manager extends Employee {
        constructor(name, id, gmail, officeNumber) {
            super(name, id, gmail);
            this.officeNumber = officeNumber;
        }
        getRole() {
            return 'Manager';
        }
        getOfficeNumber() {
            return this.officeNumber;
        }
}
module.exports = Manager;