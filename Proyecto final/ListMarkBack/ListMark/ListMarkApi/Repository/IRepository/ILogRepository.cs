using ListMarkApi.Models;

namespace ListMarkApi.Repository.IRepository
{
    public interface ILogRepository
    {
        ICollection<Log> GetLog();
        Log GetLog(int id);
        Log GetLogByCode(int code);
        bool ExistLog(int id);
        bool CreateLog(Log log);
        bool UpdateLog(Log log);
        bool DeleteLog(Log log);
        bool Save();
    }
}
