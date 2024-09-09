using ListMarkApi.Data;
using ListMarkApi.Models;
using ListMarkApi.Repository.IRepository;

namespace ListMarkApi.Repository
{
    public class PermissionRepository : IPermissionRepository
    {
        private readonly ApplicationDbContext _db;
        public PermissionRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public bool CreatePermission(Permission permission)
        {
            _db.Permission.Add(permission);
            return Save();
        }

        public bool DeletePermission(Permission permission)
        {
            _db.Permission.Remove(permission);
            return Save();
        }

        public bool ExistPermission(string name)
        {
            bool value = _db.Permission.Any(b => b.Name.ToLower().Trim() == name.ToLower().Trim());
            return value;
        }

        public bool ExistPermission(int id)
        {
            return _db.Permission.Any(brand => brand.Id == id);
        }

        public Permission GetPermission(int id)
        {
            return _db.Permission.FirstOrDefault(b => b.Id == id);
        }

        public ICollection<Permission> GetPermission()
        {
            return _db.Permission.OrderBy(b => b.Id).ToList();
        }

        public Permission GetPermissionByName(string name)
        {
            return _db.Permission.FirstOrDefault(b => b.Name == name);
        }

        public bool Save()
        {
            return _db.SaveChanges() >=0 ? true : false;
        }

        public bool UpdatePermission(Permission permission)
        {
            _db.Permission.Update(permission);
            return Save();
        }
    }
}
