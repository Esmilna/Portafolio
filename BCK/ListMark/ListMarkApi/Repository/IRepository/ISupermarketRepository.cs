using ListMarkApi.Models;

namespace ListMarkApi.Repository.IRepository
{
    public interface ISupermarketRepository
    {
        ICollection<Supermarket> GetSupermarkets();
        Supermarket GetSupermarket(int id);
        Supermarket GetSupermarketByName(string name);
        bool ExistSupermarket(string name);
        bool ExistSupermarket(int id);
        bool CreateSupermarket(Supermarket supermarket);
        bool UpdateSupermarket(Supermarket supermarket);
        bool DeleteSupermarket(Supermarket supermarket);
        bool Save();
    }
}
