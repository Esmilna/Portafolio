using ListMarkApi.Models;

namespace ListMarkApi.Repository.IRepository
{
    public interface IDetailsRepository
    {
        ICollection<Details> GetDetails();
        Details GetDetails(int id);
        bool ExistDetails(int id);
        bool CreateDetails(Details details);
        bool UpdateDetails(Details details);
        bool DeleteDetails(Details details);
        bool Save();
    }
}
