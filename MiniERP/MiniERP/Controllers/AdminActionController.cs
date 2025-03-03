using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MiniERP.Data;
using MiniERP.Models;
using System.Linq;

namespace MiniERP.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/admin")]
    [ApiController]
    public class AdminActionController : ControllerBase
    {
        private readonly AppDbContext _db;

        public AdminActionController(AppDbContext db)
        {
            _db = db;
        }

      
        [HttpGet("users")]
        public IActionResult GetAllUsers()
        {
            var users = _db.Users.Where(u => u.Role != "Admin").ToList();
            return Ok(users);
        }

        [HttpGet("user/{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _db.Users.FirstOrDefault(u => u.Id == id && u.Role != "Admin");
            if (user == null) return NotFound("User not found.");
            return Ok(user);
        }


        [HttpPut("update-user/{id}")]
        public IActionResult UpdateUser(int id, [FromBody] User updatedUser)
        {
            var user = _db.Users.FirstOrDefault(u => u.Id == id && u.Role != "Admin");
            if (user == null) return NotFound("User not found.");

            user.EmployeeName = updatedUser.EmployeeName;
            user.Username = updatedUser.Username;
            user.Role = updatedUser.Role;
            user.Password = updatedUser.Password; 

            _db.SaveChanges();
            return Ok("User updated successfully.");
        }


        [HttpDelete("delete-user/{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = _db.Users.FirstOrDefault(u => u.Id == id && u.Role != "Admin");
            if (user == null) return NotFound("User not found.");

            _db.Users.Remove(user);
            _db.SaveChanges();
            return Ok("User deleted successfully.");
        }
    }
}
