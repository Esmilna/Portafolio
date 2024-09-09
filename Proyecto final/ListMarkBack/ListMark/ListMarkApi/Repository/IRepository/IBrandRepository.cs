using ListMarkApi.Models;

namespace ListMarkApi.Repository.IRepository
{
    public interface IBrandRepository
    {
        ICollection<Brand> GetBrands();
        Brand GetBrand(int id);
        Brand GetBrandByName (string name);
        bool ExistBrand(string name);
        bool ExistBrand(int id);
        bool CreateBrand (Brand brand); 
        bool UpdateBrand (Brand brand);
        bool DeleteBrand(Brand brand);
        bool Save();

    }
}
