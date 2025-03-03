using MiniERP.Models;

namespace MiniERP.Services
{
    public interface IPurchaseOrderService
    {
        void AddPurchaseOrder(PurchaseOrder purchaseOrder);
        List<PurchaseOrder> GetAllPurchaseOrders();
        void UpdatePurchaseOrder(PurchaseOrder purchaseOrder);
        void DeletePurchaseOrder(int id);
    }
}
