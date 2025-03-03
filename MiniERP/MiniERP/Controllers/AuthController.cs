using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MiniERP.Data;
using MiniERP.Models;
using Microsoft.AspNetCore.Authorization;

namespace MiniERP.Controllers;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _config;

    public AuthController(AppDbContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }
    [HttpPost("login")]
    public IActionResult Login([FromBody] UserLoginRequest loginRequest)
    {
        var user = _db.Users.SingleOrDefault(u => u.Username == loginRequest.Username);
        if (user == null || user.Password != loginRequest.Password)
        {
            return Unauthorized("Invalid credentials");
        }

        var token = GenerateJwtToken(user);
        return Ok(new { token, role = user.Role });
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("add-user")]
    public IActionResult AddUser([FromBody] User newUser)
    {
        if (string.IsNullOrWhiteSpace(newUser.Username) ||
            string.IsNullOrWhiteSpace(newUser.EmployeeName) || 
            string.IsNullOrWhiteSpace(newUser.Password) ||
            string.IsNullOrWhiteSpace(newUser.Role) ||
            string.IsNullOrWhiteSpace(newUser.EmployeeId))  
        {
            return BadRequest("All fields are required.");
        }

        if (_db.Users.Any(u => u.Username == newUser.Username))
        {
            return BadRequest("Username already exists.");
        }

        var user = new User
        {
            EmployeeId = newUser.EmployeeId, 
            EmployeeName = newUser.EmployeeName, 
            Username = newUser.Username,
            Password = newUser.Password,
            Role = newUser.Role
        };

        _db.Users.Add(user);
        _db.SaveChanges();
        return Ok();
    }


    private string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.EmployeeId),
            new Claim(ClaimTypes.Name, user.EmployeeName),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
