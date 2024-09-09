using ListMarkApi.Models;
using ListMarkApi.Repository;
using ListMarkApi.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace ListMarkApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupermarketController : ControllerBase
    {
        private readonly ISupermarketRepository _supermarketRepository;
        public SupermarketController(ISupermarketRepository supermarketRepository)
        {
            _supermarketRepository = supermarketRepository;
        }

        [HttpGet]
        public IActionResult GetSupermarket()
        {
            var SupermarketList = _supermarketRepository.GetSupermarkets();

            return Ok(SupermarketList);

        }

        [HttpGet("GetById")]
        public IActionResult GetSupermarketById([FromQuery] int id)
        {
            var Supermarket = _supermarketRepository.GetSupermarket(id);

            if (Supermarket == null)
            {
                return NotFound();
            }

            return Ok(Supermarket);

        }

        [HttpGet("{name}", Name = "GetSupermarketByName")]
        public IActionResult GetSupermarketByName(string name)
        {
            var Supermarket = _supermarketRepository.GetSupermarketByName(name);

            if (Supermarket == null)
            {
                return NotFound();
            }

            return Ok(Supermarket);

        }

        [HttpPost]
        public IActionResult CreateSupermarket([FromBody] Supermarket supermarket)
        {
            if (supermarket == null)
            {
                return BadRequest(ModelState);
            }
            if (_supermarketRepository.ExistSupermarket(supermarket.Name))
            {
                ModelState.AddModelError("", "The Supermarket is Exist");
                return StatusCode(500, ModelState);
            }

            if (!_supermarketRepository.CreateSupermarket(supermarket))
            {
                ModelState.AddModelError("", $"Error Saving{supermarket.Name}");
                return StatusCode(500, ModelState);
            }

            return Ok();
        }

        [HttpPatch("{supermarketId:int}", Name = "GetSupermarketById")]
        public IActionResult UpdateSupermarket(int supermarketId, [FromBody] Supermarket supermarket)
        {
            if (supermarket == null || supermarketId ==null)
            {
                return BadRequest(ModelState);
            }

            if (!_supermarketRepository.UpdateSupermarket(supermarket))
            {
                ModelState.AddModelError("", $"Error Update {supermarket.Name}");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }

        [HttpDelete("{supermarketId:int}", Name = "DeleteSupermarket")]
        public IActionResult DeleteSupermarket(int supermarketId)
        {
            if (!_supermarketRepository.ExistSupermarket(supermarketId))
            {
                return NotFound();
            }

            var supermarket = _supermarketRepository.GetSupermarket(supermarketId);

            if (!_supermarketRepository.DeleteSupermarket(supermarket))
            {
                ModelState.AddModelError("", $"Error Delete {supermarketId}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}

