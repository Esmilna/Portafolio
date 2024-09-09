using ListMarkApi.Data;
using ListMarkApi.Models;
using ListMarkApi.Repository.IRepository;

namespace ListMarkApi.Repository
{
    public class DetailsRepository : IDetailsRepository
    {
        private readonly ApplicationDbContext _db;
        public DetailsRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public bool CreateDetails(Details details)
        {
            _db.Details.Add(details);
            return Save();
        }

        public bool DeleteDetails(Details details)
        {
            _db.Details.Remove(details);
            return Save();
        }

        public bool ExistDetails(int id)
        {
            return _db.Details.Any(details => details.Id == id);
        }

        public Details GetDetails(int id)
        {
            return _db.Details.FirstOrDefault(b => b.Id == id);
        }

        public ICollection<Details> GetDetails()
        {
            return _db.Details.OrderBy(b => b.Id).ToList();
        }

        public bool Save()
        {
            return _db.SaveChanges() >=0 ? true : false;
        }

        public bool UpdateDetails(Details details)
        {
            _db.Details.Update(details);
            return Save();
        }
    }
}
