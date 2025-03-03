using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MiniERP.Models;
using MiniERP.Services;

namespace MiniERP.Controllers
{
    [ApiController]
    [Route("api/purchase")]
    [Authorize(Roles = "Purchase")]
    public class PurchaseOrderController : ControllerBase
    {
        private readonly IPurchaseOrderService _purchaseOrderService;

        public PurchaseOrderController(IPurchaseOrderService purchaseOrderService)
        {
            _purchaseOrderService = purchaseOrderService;
        }

        [HttpPost("create")]
        public IActionResult CreateOrder([FromBody] PurchaseOrder purchaseOrder)
        {
            _purchaseOrderService.AddPurchaseOrder(purchaseOrder);
            return Ok(new { message = "Purchase Order Created Successfully" });
        }

        [HttpGet("all")]
        public IActionResult GetAllOrders()
        {
            var orders = _purchaseOrderService.GetAllPurchaseOrders();
            return Ok(orders);
        }

        [HttpPut("update")]
        public IActionResult UpdateOrder([FromBody] PurchaseOrder purchaseOrder)
        {
            _purchaseOrderService.UpdatePurchaseOrder(purchaseOrder);
            return Ok(new { message = "Purchase Order Updated Successfully" });
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteOrder(int id)
        {
            _purchaseOrderService.DeletePurchaseOrder(id);
            return Ok(new { message = "Purchase Order Deleted Successfully" });
        }
    }
}
