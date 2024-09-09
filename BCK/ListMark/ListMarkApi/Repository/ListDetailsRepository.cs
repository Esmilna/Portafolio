using ListMarkApi.Data;
using ListMarkApi.Models;
using ListMarkApi.Repository.IRepository;

namespace ListMarkApi.Repository
{
    public class ListDetailsRepository : IListDetailsRepository
    {
        private readonly ApplicationDbContext _db;
        public ListDetailsRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public bool CreateListDetails(ListDetails listdetails)
        {
            _db.ListDetails.Add(listdetails);
            return Save();
        }

        public bool DeleteListDetails(ListDetails listdetails)
        {
            _db.ListDetails.Remove(listdetails);
            return Save();
        }

        public bool ExistListDetails(int id)
        {
            return _db.ListDetails.Any(listdetails => listdetails.Id == id);
        }

        public ICollection<ListDetails> GetListDetails()
        {
            return _db.ListDetails.OrderBy(b => b.Id).ToList();
        }

        public ListDetails GetListDetails(int id)
        {
            return _db.ListDetails.FirstOrDefault(b => b.Id == id);
        }

        public bool Save()
        {
            return _db.SaveChanges() >=0 ? true : false;
        }

        public bool UpdateListDetails(ListDetails listdetails)
        {
            _db.ListDetails.Update(listdetails);
            return Save();
        }
    }
}
