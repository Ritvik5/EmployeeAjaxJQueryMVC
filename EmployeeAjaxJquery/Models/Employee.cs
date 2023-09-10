using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace EmployeeAjaxJquery.Models
{
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string ProfileImage { get; set; }
        public string Gender { get; set; }
        public string Department { get; set; }
        public int Salary {  get; set; }
        public DateTime StartDate { get; set; }
        public string Notes { get; set; }
    }
}
