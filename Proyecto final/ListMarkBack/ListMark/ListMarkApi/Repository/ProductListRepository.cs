using ListMarkApi.Data;
using ListMarkApi.Models;
using ListMarkApi.Repository.IRepository;

namespace ListMarkApi.Repository
{
    public class ProductListRepository : IProductListRepository
    {
        private readonly ApplicationDbContext _db;
        public ProductListRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public bool CreateProductList(ProductList productlist)
        {
            _db.ProductList.Add(productlist);
            return Save();
        }

        public bool DeleteProductList(ProductList productlist)
        {
            _db.ProductList.Remove(productlist);
            return Save();
        }

        public bool ExistProductList(int id)
        {
            return _db.ProductList.Any(productlist => productlist.Id == id);
        }

        public ICollection<ProductList> GetProductList()
        {
            return _db.ProductList.OrderBy(b => b.Id).ToList();
        }

        public ProductList GetProductList(int id)
        {
            return _db.ProductList.FirstOrDefault(b => b.Id == id);
        }

        public bool Save()
        {
            return _db.SaveChanges() >=0 ? true : false;
        }

        public bool UpdateProductList(ProductList productlist)
        {
            _db.ProductList.Update(productlist);
            return Save();
        }
    }
}
