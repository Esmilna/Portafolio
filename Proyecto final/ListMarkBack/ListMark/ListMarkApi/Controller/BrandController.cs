using ListMarkApi.Models;
using ListMarkApi.Repository;
using ListMarkApi.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ListMarkApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IBrandRepository _brandRepository;
        public BrandController(IBrandRepository brandRepository)
        {
            _brandRepository = brandRepository;
        }

        [HttpGet]
        public IActionResult GetBrands()
        {
            var BrandList = _brandRepository.GetBrands();

            return Ok(BrandList);

        }

        [HttpGet("GetById")]
        public IActionResult GetBrandById([FromQuery]int id)
        {
            var Brand = _brandRepository.GetBrand(id);

            if (Brand == null)
            {
                return NotFound();
            }

            return Ok(Brand);

        }

        [HttpGet("{name}", Name = "GetBrandByName")]
        public IActionResult GetBrandByName(string name)
        {
            var Brand = _brandRepository.GetBrandByName(name);

            if (Brand == null)
            {
                return NotFound();
            }

            return Ok(Brand);

        }

        [HttpPost]
        public IActionResult CreateBrand([FromBody] Brand brand)
        {
            if (brand == null)
            {
                return BadRequest(ModelState);
            }
            if (_brandRepository.ExistBrand(brand.Name))
            {
                ModelState.AddModelError("", "The brand is Exist");
                return StatusCode(500, ModelState);
            }

            if (!_brandRepository.CreateBrand(brand))
            {
                ModelState.AddModelError("", $"Error Saving{brand.Name}");
                return StatusCode(500, ModelState);
            }

            return Ok();
        }

        [HttpPatch("{brandId:int}", Name = "GetBrandById")]
        public IActionResult UpdateBrand(int brandId, [FromBody] Brand brand)
        {
            if (brand == null || brandId ==null)
            {
                return BadRequest(ModelState);
            }

            if (!_brandRepository.UpdateBrand(brand))
            {
                ModelState.AddModelError("", $"Error Update {brand.Name}");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }

        [HttpDelete("{brandId:int}", Name = "DeleteBrand")]
        public IActionResult DeleteBrand(int brandId) 
        {
            if (!_brandRepository.ExistBrand(brandId)) 
            {
               return NotFound();
            }

            var brand = _brandRepository.GetBrand(brandId);

            if (!_brandRepository.DeleteBrand(brand)) 
            {
                ModelState.AddModelError("", $"Error Delete {brandId}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}
