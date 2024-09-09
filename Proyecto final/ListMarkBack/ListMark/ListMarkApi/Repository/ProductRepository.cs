using ListMarkApi.Data;
using ListMarkApi.Models;
using ListMarkApi.Repository.IRepository;

namespace ListMarkApi.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _db;
        public ProductRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public bool CreateProduct(Product product)
        {
            _db.Product.Add(product);
            return Save();
        }

        public bool DeleteProduct(Product product)
        {
            _db.Product.Remove(product);
            return Save();
        }

        public bool ExistProduct(string name)
        {
            bool value = _db.Product.Any(b => b.Name.ToLower().Trim() == name.ToLower().Trim());
            return value;
        }

        public bool ExistProduct(int id)
        {
            return _db.Product.Any(brand => brand.Id == id);
        }

        public Product GetProduct(int id)
        {
            return _db.Product.FirstOrDefault(b => b.Id == id);
        }

        public Product GetProductByName(string name)
        {
            return _db.Product.FirstOrDefault(b => b.Name == name);
        }

        public ICollection<Product> GetProducts()
        {
            return _db.Product.OrderBy(b => b.Id).ToList();
        }

        public bool Save()
        {
            return _db.SaveChanges() >=0 ? true : false;
        }

        public bool UpdateProduct(Product product)
        {
            _db.Product.Update(product);
            return Save();
        }
    }
}
