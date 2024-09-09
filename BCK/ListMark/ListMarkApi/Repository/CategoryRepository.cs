using ListMarkApi.Data;
using ListMarkApi.Models;
using ListMarkApi.Repository.IRepository;

namespace ListMarkApi.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _db;
        public CategoryRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public bool CreateCategory(Category category)
        {
            _db.Category.Add(category);
            return Save();
        }

        public bool DeleteCategory(Category category)
        {
            _db.Category.Remove(category);
            return Save();
        }

        public bool ExistCategory(string name)
        {

            bool value = _db.Category.Any(b => b.Name.ToLower().Trim() == name.ToLower().Trim());
            return value;
        }

        public bool ExistCategory(int id)
        {
            return _db.Category.Any(category => category.Id == id);
        }

        public ICollection<Category> GetCategory()
        {
            return _db.Category.OrderBy(b => b.Id).ToList();
        }

        public Category GetCategory(int id)
        {
            return _db.Category.FirstOrDefault(b => b.Id == id);
        }

        public Category GetCategoryByName(string name)
        {
            return _db.Category.FirstOrDefault(b => b.Name == name);
        }

        public bool Save()
        {
            return _db.SaveChanges() >=0 ? true : false;
        }

        public bool UpdateCategory(Category category)
        {
            _db.Category.Update(category);
            return Save();
        }
    }
}
