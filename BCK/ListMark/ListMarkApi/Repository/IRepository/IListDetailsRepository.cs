using ListMarkApi.Models;

namespace ListMarkApi.Repository.IRepository
{
    public interface IListDetailsRepository
    {
        ICollection<ListDetails> GetListDetails();
        ListDetails GetListDetails(int id);
        bool ExistListDetails(int id);
        bool CreateListDetails(ListDetails listdetails);
        bool UpdateListDetails(ListDetails listdetails);
        bool DeleteListDetails(ListDetails listdetails);
        bool Save();
    }
}
