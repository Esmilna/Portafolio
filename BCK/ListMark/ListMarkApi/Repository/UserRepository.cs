using ListMarkApi.Data;
using ListMarkApi.Models;
using ListMarkApi.Repository.IRepository;

namespace ListMarkApi.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _db;
        public UserRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public bool CreateUser(User user)
        {
            _db.User.Add(user);
            return Save();
        }

        public bool DeleteUser(User user)
        {
            _db.User.Remove(user);
            return Save();
        }

        public bool ExistUser(string name)
        {
            bool value = _db.User.Any(b => b.Name.ToLower().Trim() == name.ToLower().Trim());
            return value;
        }

        public bool ExistUser(int id)
        {
            return _db.User.Any(user => user.Id == id);
        }

        public User GetUser(int id)
        {
            return _db.User.FirstOrDefault(b => b.Id == id);
        }

        public ICollection<User> GetUser()
        {
            return _db.User.OrderBy(b => b.Id).ToList();
        }

        public User GetUserByName(string name)
        {
            return _db.User.FirstOrDefault(b => b.Name == name);
        }

        public bool Save()
        {
            return _db.SaveChanges() >=0 ? true : false;
        }

        public bool UpdateUser(User user)
        {
            _db.User.Update(user);
            return Save();
        }
    }
}
