using ListMarkApi.Models;

namespace ListMarkApi.Repository.IRepository
{
    public interface IProductRepository
    {
        ICollection<Product> GetProducts();
        Product GetProduct(int id);
        Product GetProductByName(string name);
        bool ExistProduct(string name);
        bool ExistProduct(int id);
        bool CreateProduct(Product product);
        bool UpdateProduct(Product product);
        bool DeleteProduct(Product product);
        bool Save();
    }
}
