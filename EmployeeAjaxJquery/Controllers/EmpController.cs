using EmployeeAjaxJquery.Data;
using EmployeeAjaxJquery.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace EmployeeAjaxJquery.Controllers
{
    public class EmpController : Controller
    {
        private readonly EmployeeContext context;
        public EmpController(EmployeeContext context)
        {
            this.context = context;
        }
        public IActionResult Index()
        {
            return View();
        }
        public JsonResult EmployeeList()
        {
            try
            {
                var result = context.Employees.ToList();
                return new JsonResult(result);
            }
            catch (System.Exception)
            {

                throw;
            }
        }
        [HttpPost]
        public JsonResult AddEmployee(Employee employee)
        {
            try
            {
                var emp = new Employee()
                {
                    Name = employee.Name,
                    ProfileImage = employee.ProfileImage,
                    Gender = employee.Gender,
                    Department = employee.Department,
                    Salary = employee.Salary,
                    StartDate = employee.StartDate,
                    Notes = employee.Notes,

                };
                context.Employees.Add(emp);
                context.SaveChanges();
                return new JsonResult("Data is saved.");
            }
            catch (System.Exception)
            {

                throw;
            }
        }
        public JsonResult Delete(int employeeId)
        {
            try
            {
                var result = context.Employees.Where(e => e.EmployeeId == employeeId).SingleOrDefault();
                context.Employees.Remove(result);
                context.SaveChanges();
                return new JsonResult("Data Deleted");
            }
            catch (System.Exception)
            {

                throw;
            }
        }
        public JsonResult  Edit(int employeeId)
        {
            try
            {
                var record = context.Employees.Where(e => e.EmployeeId == employeeId).SingleOrDefault();
                return new JsonResult(record);
            }
            catch (System.Exception)
            {

                throw;
            }
        }
        public JsonResult Update(Employee employee)
        {
            try
            {
                context.Employees.Update(employee);
                context.SaveChanges();
                return new JsonResult("Record Updated");
            }
            catch (System.Exception)
            {

                throw;
            }
        }
    }
}
