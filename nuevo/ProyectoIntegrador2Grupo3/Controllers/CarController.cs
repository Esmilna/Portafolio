using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaDeInventarioDeVentaDeVehiculos.Data.Context;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SistemaDeInventarioDeVentaDeVehiculos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly CarDbContext _context;

        public CarController(CarDbContext context)
        {
            _context = context;
        }

        // GET: api/<CarController>
        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var cars = await _context.Cars.ToListAsync();

            return Ok(cars);
        }

        // GET api/<CarController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCarByIdAsync(int id)
        {
            //TODO add role validation and error code 

            var car = await _context.Cars.FindAsync(id);

            return Ok(car);
        }

        public async Task<IActionResult> GetCarsByBrandIdAsync(int id)
        {
            //TODO

            return Ok();
        }

        public async Task<IActionResult> GetCarsByModelIdAsync(int id)
        {
            //TODO

            return Ok();
        }

        // POST api/<CarController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
            //TODO
        }

        // PUT api/<CarController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
            //TODO
        }

        // DELETE api/<CarController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            //TODO
        }
    }
}
