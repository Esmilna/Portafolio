using ListMarkApi.Models;

namespace ListMarkApi.Repository.IRepository
{
    public interface IListRepository
    {
        ICollection<List> GetList();
        List GetList(int id);
        List GetListByName(string name);
        bool ExistList(int id);
        bool ExistList (string name);
        bool CreateList(List list);
        bool UpdateList(List list);
        bool DeleteList(List list);
        bool Save();
    }
}
