using MiniERP.Models;
using MiniERP.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MiniERP.Controllers
{
    [Route("api/supplier")]
    [ApiController]
    [Authorize(Roles = "Purchase")]
    public class SupplierController : ControllerBase
    {
        private readonly ISupplierService _supplierService;

        public SupplierController(ISupplierService supplierService)
        {
            _supplierService = supplierService;
        }

        [HttpPost("add")]
        public IActionResult AddSupplier([FromBody] Supplier supplier)
        {
            if (supplier == null)
            {
                return BadRequest("Supplier data cannot be null");
            }

            _supplierService.AddSupplier(supplier);
            return Ok(new { message = "Supplier Added Successfully" });
        }

        [HttpGet("all")]
        public IActionResult GetAllSuppliers()
        {
            var suppliers = _supplierService.GetAllSuppliers();
            return Ok(suppliers);
        }
        [HttpPut("update/{id}")]
        public IActionResult UpdateSupplier(int id, [FromBody] Supplier supplier)
        {
            _supplierService.UpdateSupplier(id, supplier);
            return Ok(new { message = "Supplier Updated Successfully" });
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteSupplier(int id)
        {
            _supplierService.DeleteSupplier(id);
            return Ok(new { message = "Supplier Deleted Successfully" });
        }

    }
}
