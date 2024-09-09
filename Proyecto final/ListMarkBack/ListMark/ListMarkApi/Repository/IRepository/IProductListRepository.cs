using ListMarkApi.Models;

namespace ListMarkApi.Repository.IRepository
{
    public interface IProductListRepository
    {
        ICollection<ProductList> GetProductList();
        ProductList GetProductList(int id);
        bool ExistProductList(int id);
        bool CreateProductList(ProductList productlist);
        bool UpdateProductList(ProductList productlist);
        bool DeleteProductList(ProductList productlist);
        bool Save();
    }
}
