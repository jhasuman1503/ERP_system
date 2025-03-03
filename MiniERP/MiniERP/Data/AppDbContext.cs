using Microsoft.EntityFrameworkCore;
using MiniERP.Models;

namespace MiniERP.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Supplier> Suppliers { get; set; }
    public DbSet<SalesOrder> SalesOrders { get; set; }
    public DbSet<PurchaseOrder> PurchaseOrders { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<SalesOrder>()
            .HasOne(s => s.Customer)  
            .WithMany(c => c.SalesOrders) 
            .HasForeignKey(s => s.CustomerId) 
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<PurchaseOrder>()
     .HasOne(p => p.Product)
     .WithMany()
     .HasForeignKey(p => p.ProductId);

        modelBuilder.Entity<PurchaseOrder>()
            .HasOne(p => p.Supplier)
            .WithMany()
            .HasForeignKey(p => p.SupplierId);



    }
}
