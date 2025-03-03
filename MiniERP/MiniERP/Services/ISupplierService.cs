using MiniERP.Models;

public interface ISupplierService
{
    void AddSupplier(Supplier supplier);
    List<Supplier> GetAllSuppliers();
    void UpdateSupplier(int id, Supplier supplier);
    void DeleteSupplier(int id);
}
