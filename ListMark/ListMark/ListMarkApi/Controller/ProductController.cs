using ListMarkApi.Models;
using ListMarkApi.Repository;
using ListMarkApi.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ListMarkApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet]
        public IActionResult GetProduct()
        {
            var ProductList = _productRepository.GetProducts();

            return Ok(ProductList);

        }

        [HttpGet("GetById")]
        public IActionResult GeProducttById([FromQuery] int id)
        {
            var Product = _productRepository.GetProduct(id);

            if (Product == null)
            {
                return NotFound();
            }

            return Ok(Product);

        }

        [HttpGet("{name}", Name = "GetProductByName")]
        public IActionResult GetProductByName(string name)
        {
            var Product = _productRepository.GetProductByName(name);

            if (Product == null)
            {
                return NotFound();
            }

            return Ok(Product);

        }

        [HttpPost]
        public IActionResult CreateProduct([FromBody] Product product)
        {
            if (product == null)
            {
                return BadRequest(ModelState);
            }
            if (_productRepository.ExistProduct(product.Name))
            {
                ModelState.AddModelError("", "The Product is Exist");
                return StatusCode(500, ModelState);
            }

            if (!_productRepository.CreateProduct(product))
            {
                ModelState.AddModelError("", $"Error Saving{product.Name}");
                return StatusCode(500, ModelState);
            }

            return Ok();
        }

        [HttpPatch("{productId:int}", Name = "GetProductById")]
        public IActionResult UpdateProduct(int productId, [FromBody] Product product)
        {
            if (product == null || productId ==null)
            {
                return BadRequest(ModelState);
            }

            if (!_productRepository.UpdateProduct(product))
            {
                ModelState.AddModelError("", $"Error Update {product.Name}");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }

        [HttpDelete("{productId:int}", Name = "DeleteProduct")]
        public IActionResult DeleteBrand(int productId)
        {
            if (!_productRepository.ExistProduct(productId))
            {
                return NotFound();
            }

            var product = _productRepository.GetProduct(productId);

            if (!_productRepository.DeleteProduct(product))
            {
                ModelState.AddModelError("", $"Error Delete {productId}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}

