using ListMarkApi.Models;

namespace ListMarkApi.Repository.IRepository
{
    public interface IUserRepository
    {
        ICollection<User> GetUser();
        User GetUser(int id);
        User GetUserByName(string name);
        bool ExistUser(string name);
        bool ExistUser(int id);
        bool CreateUser(User user);
        bool UpdateUser(User user);
        bool DeleteUser(User user);
        bool Save();
    }
}
