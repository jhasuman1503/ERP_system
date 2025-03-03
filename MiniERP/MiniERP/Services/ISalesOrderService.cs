using MiniERP.Models;

namespace MiniERP.Services
{
    public interface ISalesOrderService
    {

        void CreateSalesOrder(SlaesOrderURL salesOrder);
        List<SlaesOrderURL> GetAllSalesOrders();




    }
}
