using ListMarkApi.Data;
using ListMarkApi.Models;
using ListMarkApi.Repository.IRepository;

namespace ListMarkApi.Repository
{
    public class SupermarketRepository : ISupermarketRepository
    {
        private readonly ApplicationDbContext _db;
        public SupermarketRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public bool CreateSupermarket(Supermarket supermarket)
        {
            _db.Supermarket.Add(supermarket);
            return Save();
        }

        public bool DeleteSupermarket(Supermarket supermarket)
        {
            _db.Supermarket.Remove(supermarket);
            return Save();
        }

        public bool ExistSupermarket(string name)
        {
            bool value = _db.Supermarket.Any(b => b.Name.ToLower().Trim() == name.ToLower().Trim());
            return value;
        }

        public bool ExistSupermarket(int id)
        {
            return _db.Supermarket.Any(supermarket => supermarket.Id == id);
        }

        public Supermarket GetSupermarket(int id)
        {
            return _db.Supermarket.FirstOrDefault(b => b.Id == id);
        }

        public Supermarket GetSupermarketByName(string name)
        {
            return _db.Supermarket.FirstOrDefault(b => b.Name == name);
        }

        public ICollection<Supermarket> GetSupermarkets()
        {
            return _db.Supermarket.OrderBy(b => b.Id).ToList();
        }

        public bool Save()
        {
            return _db.SaveChanges() >=0 ? true : false;
        }

        public bool UpdateSupermarket(Supermarket supermarket)
        {
            _db.Supermarket.Update(supermarket);
            return Save();
        }
    }
}
