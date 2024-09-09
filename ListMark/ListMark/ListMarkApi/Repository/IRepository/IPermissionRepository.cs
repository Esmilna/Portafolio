using ListMarkApi.Models;

namespace ListMarkApi.Repository.IRepository
{
    public interface IPermissionRepository
    {
        ICollection<Permission> GetPermission();
        Permission GetPermission(int id);
        Permission GetPermissionByName(string name);
        bool ExistPermission(string name);
        bool ExistPermission(int id);
        bool CreatePermission(Permission permission);
        bool UpdatePermission(Permission permission);
        bool DeletePermission(Permission permission);
        bool Save();
    }
}
