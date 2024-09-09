using ListMarkApi.Models;
using ListMarkApi.Repository;
using ListMarkApi.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ListMarkApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductListController : ControllerBase
    {
        private readonly IProductListRepository _productlistRepository;
        public ProductListController(IProductListRepository productlistRepository)
        {
            _productlistRepository = productlistRepository;

        }

        [HttpGet]
        public IActionResult GetProductList()
        {
            var ProductListList = _productlistRepository.GetProductList();

            return Ok(ProductListList);

        }

        [HttpGet("GetById")]
        public IActionResult GetProductListById([FromQuery] int id)
        {
            var ProductList = _productlistRepository.GetProductList(id);

            if (ProductList == null)
            {
                return NotFound();
            }

            return Ok(ProductList);

        }


        [HttpPost]
        public IActionResult CreateProductList([FromBody] ProductList productlist)
        {
            if (productlist == null)
            {
                return BadRequest(ModelState);
            }
            if (_productlistRepository.ExistProductList(productlist.Id))
            {
                ModelState.AddModelError("", "The ProductList is Exist");
                return StatusCode(500, ModelState);
            }

            if (!_productlistRepository.CreateProductList(productlist))
            {
                ModelState.AddModelError("", $"Error Saving{productlist.Id}");
                return StatusCode(500, ModelState);
            }

            return Ok();
        }

        [HttpPatch("{productlistId:int}", Name = "GetProductListById")]
        public IActionResult UpdateProductList(int productlistId, [FromBody] ProductList productlist)
        {
            if (productlist == null || productlistId ==null)
            {
                return BadRequest(ModelState);
            }

            if (!_productlistRepository.UpdateProductList(productlist))
            {
                ModelState.AddModelError("", $"Error Update {productlist.Id}");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }

        [HttpDelete("{productlistId:int}", Name = "DeleteProductList")]
        public IActionResult DeleteProductList(int productlistId)
        {
            if (!_productlistRepository.ExistProductList(productlistId))
            {
                return NotFound();
            }

            var productlist = _productlistRepository.GetProductList(productlistId);

            if (!_productlistRepository.DeleteProductList(productlist))
            {
                ModelState.AddModelError("", $"Error Delete {productlistId}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}
