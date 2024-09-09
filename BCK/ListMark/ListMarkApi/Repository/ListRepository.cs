using ListMarkApi.Data;
using ListMarkApi.Models;
using ListMarkApi.Repository.IRepository;

namespace ListMarkApi.Repository
{
    public class ListRepository : IListRepository
    {
        private readonly ApplicationDbContext _db;
        public ListRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public bool CreateList(List list)
        {
            _db.List.Add(list);
            return Save();
        }

        public bool DeleteList(List list)
        {
            _db.List.Remove(list);
            return Save();
        }

        public bool ExistList(int id)
        {
            return _db.List.Any(list => list.Id == id);
        }

        public bool ExistList(string name)
        {
            bool value = _db.List.Any(b => b.Name.ToLower().Trim() == name.ToLower().Trim());
            return value;
        }

        public ICollection<List> GetList()
        {
            return _db.List.OrderBy(b => b.Id).ToList();
        }

        public List GetList(int id)
        {
            return _db.List.FirstOrDefault(b => b.Id == id);
        }

        public List GetListByName(string name)
        {
            return _db.List.FirstOrDefault(b => b.Name == name);
        }

        public bool Save()
        {
            return _db.SaveChanges() >=0 ? true : false;
        }

        public bool UpdateList(List list)
        {
            _db.List.Update(list);
            return Save();
        }
    }
}
