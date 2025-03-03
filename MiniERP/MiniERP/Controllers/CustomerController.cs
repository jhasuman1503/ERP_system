using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MiniERP.Models;
using MiniERP;

[ApiController]
[Route("api/sales/customers")]
[Authorize(Roles = "Sales")]
public class CustomerController : ControllerBase
{
    private readonly ICustomerService _customerService;

    public CustomerController(ICustomerService customerService)
    {
        _customerService = customerService;
    }

    [HttpPost("add")]
    public IActionResult AddCustomer([FromBody] Customer customer)
    {
        _customerService.AddCustomer(customer);
        return Ok();
    }

    [HttpGet("all")]
    public IActionResult GetAllCustomers()
    {
        var customers = _customerService.GetAllCustomers();
        return Ok(customers);
    }

    [HttpPut("update/{id}")]
    public IActionResult UpdateCustomer(int id, [FromBody] Customer customer)
    {
        var existingCustomer = _customerService.GetCustomerById(id);
        if (existingCustomer == null)
            return NotFound(new { message = "Customer Not Found" });

        existingCustomer.Name = customer.Name;
        existingCustomer.Email = customer.Email;
        existingCustomer.Phone = customer.Phone;

        _customerService.UpdateCustomer(existingCustomer);
        return Ok(new { message = "Customer Updated Successfully" });
    }

    [HttpDelete("delete/{id}")]
    public IActionResult DeleteCustomer(int id)
    {
        _customerService.DeleteCustomer(id);
        return Ok(new { message = "Customer Deleted Successfully" });
    }
}

