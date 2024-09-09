using ListMarkApi.Models;
using ListMarkApi.Repository;
using ListMarkApi.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
namespace ListMarkApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly IStockRepository _stockRepository;
        public StockController(IStockRepository stockRepository)
        {
            _stockRepository = stockRepository;

        }

        [HttpGet]
        public IActionResult GetStock()
        {
            var StockList = _stockRepository.GetStock();

            return Ok(StockList);

        }

        [HttpGet("GetById")]
        public IActionResult GetStockById([FromQuery] int id)
        {
            var Stock = _stockRepository.GetStock(id);

            if (Stock == null)
            {
                return NotFound();
            }

            return Ok(Stock);

        }


        [HttpPost]
        public IActionResult CreateStock([FromBody] Stock stock)
        {
            if (stock == null)
            {
                return BadRequest(ModelState);
            }
            if (_stockRepository.ExistStock(stock.Id))
            {
                ModelState.AddModelError("", "The Stock is Exist");
                return StatusCode(500, ModelState);
            }

            if (!_stockRepository.CreateStock(stock))
            {
                ModelState.AddModelError("", $"Error Saving{stock.Id}");
                return StatusCode(500, ModelState);
            }

            return Ok();
        }

        [HttpPatch("{stockId:int}", Name = "GetStockById")]
        public IActionResult UpdateStock(int stockId, [FromBody] Stock stock)
        {
            if (stock == null || stockId ==null)
            {
                return BadRequest(ModelState);
            }

            if (!_stockRepository.UpdateStock(stock))
            {
                ModelState.AddModelError("", $"Error Update {stock.Id}");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }

        [HttpDelete("{stockId:int}", Name = "DeleteStock")]
        public IActionResult DeleteStock(int stockId)
        {
            if (!_stockRepository.ExistStock(stockId))
            {
                return NotFound();
            }

            var stock = _stockRepository.GetStock(stockId);

            if (!_stockRepository.DeleteStock(stock))
            {
                ModelState.AddModelError("", $"Error Delete {stockId}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}

