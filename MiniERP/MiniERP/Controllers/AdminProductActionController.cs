using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MiniERP.Data;
using MiniERP.Models;

namespace MiniERP.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/admin/products")]
    [ApiController]
    public class AdminProductActionController : ControllerBase
    {
        private readonly AppDbContext _db;

        public AdminProductActionController(AppDbContext db)
        {
            _db = db;
        }

        [HttpPost]
        public IActionResult AddProduct([FromBody] Product newProduct)
        {
            _db.Products.Add(newProduct);
            _db.SaveChanges();
            return Ok();
        }


        [HttpGet]
        public IActionResult GetProducts()
        {
            var products = _db.Products.ToList();
            return Ok(products);
        }


        [HttpGet("{id}")]
        public IActionResult GetProduct(int id)
        {
            var product = _db.Products.Find(id);
            if (product == null)
                return NotFound("Product not found.");
            return Ok(product);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, [FromBody] Product updatedProduct)
        {
            var existingProduct = _db.Products.Find(id);
            if (existingProduct == null)
                return NotFound("Product not found.");

            existingProduct.Name = updatedProduct.Name;
            existingProduct.Price = updatedProduct.Price;
            existingProduct.Stock = updatedProduct.Stock;

            _db.SaveChanges();
            return Ok("Product updated successfully.");
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var product = _db.Products.Find(id);
            if (product == null)
                return NotFound("Product not found.");

            _db.Products.Remove(product);
            _db.SaveChanges();
            return Ok("Product deleted successfully.");
        }
    }
}
