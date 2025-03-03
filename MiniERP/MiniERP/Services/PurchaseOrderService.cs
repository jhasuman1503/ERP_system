using Microsoft.EntityFrameworkCore;
using MiniERP.Data;
using MiniERP.Models;

namespace MiniERP.Services
{
    public class PurchaseOrderService : IPurchaseOrderService
    {
        private readonly AppDbContext _context;

        public PurchaseOrderService(AppDbContext context)
        {
            _context = context;
        }

        public void AddPurchaseOrder(PurchaseOrder purchaseOrder)
        {
            var product = _context.Products.FirstOrDefault(p => p.Id == purchaseOrder.ProductId);
            if (product == null)
            {
                throw new Exception("Product not found");
            }

            if (product.Stock < purchaseOrder.Quantity)
            {
                throw new Exception("Insufficient stock");
            }

            product.Stock -= purchaseOrder.Quantity;

            _context.PurchaseOrders.Add(purchaseOrder);
            _context.SaveChanges();
        }


        public List<PurchaseOrder> GetAllPurchaseOrders()
        {
            return _context.PurchaseOrders.ToList();
        }

        public void UpdatePurchaseOrder(PurchaseOrder purchaseOrder)
        {
            _context.PurchaseOrders.Update(purchaseOrder);
            _context.SaveChanges();
        }

        public void DeletePurchaseOrder(int id)
        {
            var purchaseOrder = _context.PurchaseOrders.Find(id);
            if (purchaseOrder != null)
            {
                _context.PurchaseOrders.Remove(purchaseOrder);
                _context.SaveChanges();
            }
        }

    }
}
