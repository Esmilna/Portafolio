using ListMarkApi.Models;

namespace ListMarkApi.Repository.IRepository
{
    public interface IStockRepository
    {
        ICollection<Stock> GetStock();
        Stock GetStock(int id);
        bool ExistStock(int id);
        bool CreateStock(Stock stock);
        bool UpdateStock(Stock stock);
        bool DeleteStock(Stock stock);
        bool Save();
    }
}
