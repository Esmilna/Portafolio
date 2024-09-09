using ListMarkApi.Models;

namespace ListMarkApi.Repository.IRepository
{
    public interface ICategoryRepository
    {
        ICollection<Category> GetCategory();
        Category GetCategory(int id);
        Category GetCategoryByName(string name);
        bool ExistCategory(string name);
        bool ExistCategory(int id);
        bool CreateCategory(Category category);
        bool UpdateCategory(Category category);
        bool DeleteCategory(Category category);
        bool Save();

    }
}
