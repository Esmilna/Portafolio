using ListMarkApi.Data;
using ListMarkApi.Models;
using ListMarkApi.Repository.IRepository;

namespace ListMarkApi.Repository
{
    public class StockRepository : IStockRepository
    {
        private readonly ApplicationDbContext _db;
        public StockRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public bool CreateStock(Stock stock)
        {
            _db.Stock.Add(stock);
            return Save();
        }

        public bool DeleteStock(Stock stock)
        {
            _db.Stock.Remove(stock);
            return Save();
        }

        public bool ExistStock(int id)
        {
            return _db.Stock.Any(stock => stock.Id == id);
        }

        public Stock GetStock(int id)
        {
            return _db.Stock.FirstOrDefault(b => b.Id == id);
        }

        public ICollection<Stock> GetStock()
        {
            return _db.Stock.OrderBy(b => b.Id).ToList();
        }

        public bool Save()
        {
            return _db.SaveChanges() >=0 ? true : false;
        }

        public bool UpdateStock(Stock stock)
        {
            _db.Stock.Update(stock);
            return Save();
        }
    }
    
}
