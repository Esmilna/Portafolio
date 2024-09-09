using ListMarkApi.Data;
using ListMarkApi.Models;
using ListMarkApi.Repository.IRepository;

namespace ListMarkApi.Repository
{
    public class CommonfieldsRepository : ICommonfieldsRepository
    {
        private readonly ApplicationDbContext _db;
        public CommonfieldsRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public bool CreateCommonfields(Commonfields commonfields)
        {
            _db.Commonfields.Add(commonfields);
            return Save();
        }

        public bool DeleteCommonfields(Commonfields commonfields)
        {
            _db.Commonfields.Remove(commonfields);
            return Save();
        }

        public bool ExistCommonfields(int id)
        {
            return _db.Commonfields.Any(commonfields=> commonfields.Id == id);
        }

        public Commonfields GetCommonfields(int id)
        {
            return _db.Commonfields.FirstOrDefault(b => b.Id == id);
        }

        public ICollection<Commonfields> GetCommonfields()
        {
            return _db.Commonfields.OrderBy(b => b.Id).ToList();
        }

        public bool Save()
        {
            return _db.SaveChanges() >=0 ? true : false;
        }

        public bool UpdateCommonfields(Commonfields commonfields)
        {
            _db.Commonfields.Update(commonfields);
            return Save();
        }
    }
    
}
