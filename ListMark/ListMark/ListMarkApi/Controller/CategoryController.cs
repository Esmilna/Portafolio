using ListMarkApi.Models;
using ListMarkApi.Repository;
using ListMarkApi.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ListMarkApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        public IActionResult GetCategory()
        {
            var CategoryList = _categoryRepository.GetCategory();

            return Ok(CategoryList);

        }

        [HttpGet("GetById")]
        public IActionResult GetCategoryById([FromQuery] int id)
        {
            var Category = _categoryRepository.GetCategory(id);

            if (Category == null)
            {
                return NotFound();
            }

            return Ok(Category);

        }

        [HttpGet("{name}", Name = "GetCategoryByName")]
        public IActionResult GetCategoryByName(string name)
        {
            var Category = _categoryRepository.GetCategoryByName(name);

            if (Category == null)
            {
                return NotFound();
            }

            return Ok(Category);

        }

        [HttpPost]
        public IActionResult CreateCategory([FromBody] Category category)
        {
            if (category == null)
            {
                return BadRequest(ModelState);
            }
            if (_categoryRepository.ExistCategory(category.Name))
            {
                ModelState.AddModelError("", "The category is Exist");
                return StatusCode(500, ModelState);
            }

            if (!_categoryRepository.CreateCategory(category))
            {
                ModelState.AddModelError("", $"Error Saving{category.Name}");
                return StatusCode(500, ModelState);
            }

            return Ok();
        }

        [HttpPatch("{categoryId:int}", Name = "GetCategoryById")]
        public IActionResult UpdateCategory(int categoryId, [FromBody] Category category)
        {
            if (category == null || categoryId ==null)
            {
                return BadRequest(ModelState);
            }

            if (!_categoryRepository.UpdateCategory(category))
            {
                ModelState.AddModelError("", $"Error Update {category.Name}");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }

        [HttpDelete("{categoryId:int}", Name = "DeleteCategory")]
        public IActionResult DeleteCategory(int categoryId)
        {
            if (!_categoryRepository.ExistCategory(categoryId))
            {
                return NotFound();
            }

            var category = _categoryRepository.GetCategory(categoryId);

            if (!_categoryRepository.DeleteCategory(category))
            {
                ModelState.AddModelError("", $"Error Delete {categoryId}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}

