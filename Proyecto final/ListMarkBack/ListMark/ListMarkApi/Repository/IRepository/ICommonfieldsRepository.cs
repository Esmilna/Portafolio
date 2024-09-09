using ListMarkApi.Models;

namespace ListMarkApi.Repository.IRepository
{
    public interface ICommonfieldsRepository
    {
        ICollection<Commonfields> GetCommonfields();
        Commonfields GetCommonfields(int id);
        bool ExistCommonfields(int id);
        bool CreateCommonfields(Commonfields commonfields);
        bool UpdateCommonfields(Commonfields commonfields);
        bool DeleteCommonfields(Commonfields commonfields);
        bool Save();
    }
}
