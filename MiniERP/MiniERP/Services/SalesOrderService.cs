using Microsoft.EntityFrameworkCore;
using MiniERP.Data;
using MiniERP.Models;
using MiniERP.Services;

public class SalesOrderService : ISalesOrderService
{
    private readonly AppDbContext _context;

    public SalesOrderService(AppDbContext context)
    {
        _context = context;
    }

    public void CreateSalesOrder(SlaesOrderURL salesOrder)
    {
        var customer = _context.Customers.FirstOrDefault(c => c.Id == salesOrder.CustomerId);
        if (customer == null)
        {
            throw new Exception("Customer not found.");
        }

        var sales = new SalesOrder
        {
            CustomerId = salesOrder.CustomerId,
            TotalAmount = salesOrder.TotalAmount
        };

        _context.SalesOrders.Add(sales);
        _context.SaveChanges();
    }

    public List<SlaesOrderURL> GetAllSalesOrders()
    {
        return _context.SalesOrders
            .Select(s => new SlaesOrderURL
            {
                Id = s.Id,
                CustomerId = s.CustomerId,
                TotalAmount = s.TotalAmount
            }).ToList();
    }
}
