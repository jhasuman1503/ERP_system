namespace MiniERP.Models;
public class User
{
    public int Id { get; set; }
    public string EmployeeId { get; set; } 
    public string EmployeeName { get; set; } 
    public string Username { get; set; } 
    public string Password { get; set; }
    public string Role { get; set; } 
}
