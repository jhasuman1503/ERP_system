using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MiniERP.Models;
using MiniERP.Services;

[ApiController]
[Route("api/sales/orders")]
[Authorize(Roles = "Sales")]
public class SalesController : ControllerBase
{
    private readonly ISalesOrderService _salesOrderService;

    public SalesController(ISalesOrderService salesOrderService)
    {
        _salesOrderService = salesOrderService;
    }

    [HttpPost("create")]
    public IActionResult CreateOrder([FromBody] SlaesOrderURL salesOrder)
    {
        try
        {
            _salesOrderService.CreateSalesOrder(salesOrder);
            return Ok(new { message = "Sales Order Created Successfully" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("all")]
    public IActionResult GetAllOrders()
    {
        var orders = _salesOrderService.GetAllSalesOrders();
        return Ok(orders);
    }
}
