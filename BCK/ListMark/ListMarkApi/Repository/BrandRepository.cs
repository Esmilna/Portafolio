using ListMarkApi.Data;
using ListMarkApi.Models;
using ListMarkApi.Repository.IRepository;

namespace ListMarkApi.Repository
{
    public class BrandRepository : IBrandRepository
    {
        private readonly ApplicationDbContext _db;
        public BrandRepository(ApplicationDbContext db) 
        {
            _db = db;
        }

        public bool CreateBrand(Brand brand)
        {
            _db.Brand.Add(brand);
            return Save();
        }

        public bool DeleteBrand(Brand brand)
        {
            _db.Brand.Remove(brand);
            return Save();
        }

        public bool ExistBrand(string name)
        {
            bool value = _db.Brand.Any(b => b.Name.ToLower().Trim() == name.ToLower().Trim());
            return value;
        }

        public bool ExistBrand(int id)
        {
            return _db.Brand.Any(brand => brand.Id == id);
        }

        public Brand GetBrand(int id)
        {
            return _db.Brand.FirstOrDefault(b => b.Id == id);
        }

        public Brand GetBrandByName(string name)
        {
            return _db.Brand.FirstOrDefault(b => b.Name == name);
        }

        public ICollection<Brand> GetBrands()
        {
            return _db.Brand.OrderBy(b => b.Id).ToList();
        }

        public bool Save()
        {
            return _db.SaveChanges() >=0 ? true : false;
        }

        public bool UpdateBrand(Brand brand)
        {

            _db.Brand.Update(brand);
            return Save();
        }
    }
}
