using ListMarkApi.Data;
using ListMarkApi.Models;
using ListMarkApi.Repository.IRepository;

namespace ListMarkApi.Repository
{
    public class LogRepository : ILogRepository
    {
        private readonly ApplicationDbContext _db;
        public LogRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public bool CreateLog(Log log)
        {
            _db.Log.Add(log);
            return Save();
        }

        public bool DeleteLog(Log log)
        {
            _db.Log.Remove(log);
            return Save();
        }

        public bool ExistLog(int id)
        {
            return _db.Log.Any(log => log.Id == id);
        }

        public Log GetLog(int id)
        {
            return _db.Log.FirstOrDefault(b => b.Id == id);
        }

        public ICollection<Log> GetLog()
        {
            return _db.Log.OrderBy(b => b.Id).ToList();
        }

        public Log GetLogByCode(int code)
        {
            return _db.Log.FirstOrDefault(b => b.Code == code);
        }

        public bool Save()
        {
            return _db.SaveChanges() >=0 ? true : false;
        }

        public bool UpdateLog(Log log)
        {
            _db.Log.Update(log);
            return Save();
        }
    }
    
}
