using DB.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaDeInventarioDeVentaDeVehiculos.Data.Context;
using SistemaDeInventarioDeVentaDeVehiculos.Utils;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SistemaDeInventarioDeVentaDeVehiculos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly CarDbContext _context;

        public BrandController(CarDbContext context)
        {
            _context = context;
        }

        // GET: api/<BrandController>
        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var httpHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();
            if (httpHeader == null) return BadRequest(new OperationResult("No autorizado", false));

            var tokenValidation = TokenValidationResult.Verify(httpHeader);
            if (!tokenValidation.success) return BadRequest(tokenValidation);

            var brands = await _context.Brands.ToListAsync();

            if (tokenValidation.dataSession != null && tokenValidation.dataSession.role == "admin")
            {
                return Ok(brands);
            }
            else
            {
                return NotFound();
            }
        }

        // GET api/<BrandController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBrandByIdAsync(int id)
        {
            var httpHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (httpHeader == null) return BadRequest(new OperationResult("No autorizado", false));

            var tokenValidation = TokenValidationResult.Verify(httpHeader);
            if (!tokenValidation.success) return BadRequest(tokenValidation);

            if (tokenValidation.dataSession != null && tokenValidation.dataSession.role == "admin")
            {
                bool brandExist = _context.Brands.Any(c => c.Id == id);

                if (brandExist)
                {
                    var brand = await _context.Brands.FindAsync(id);

                    if (brand == null) return NotFound();

                    return Ok(new { success = true, brand });
                }

                else return NotFound();
            }

            return StatusCode(403);
        }

        // POST api/<BrandController> Create Brand
        [HttpPost]
        public async Task<IActionResult> CreateBrand([FromBody] Brand brand)
        {
            var httpHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (httpHeader == null)
            {
                return BadRequest(new OperationResult("No autorizado", false));
            }

            var tokenValidation = TokenValidationResult.Verify(httpHeader);
            if (!tokenValidation.success)
            {
                return BadRequest(tokenValidation);
            }

            if (tokenValidation.dataSession != null && tokenValidation.dataSession.role == "admin")
            {
                if (brand == null)
                {
                    return BadRequest(new OperationResult("Datos enviados invalidos", false));
                }

                var brandIsRegistered = await _context.Brands.AnyAsync(u => u.Nombre == brand.Nombre);

                if (brandIsRegistered)
                {
                    return BadRequest(new OperationResult("La marca ya existe", false));
                }

                _context.Brands.Add(brand);
                await _context.SaveChangesAsync();

                return Ok(new OperationResult("Marca agregada Correctamente!", true));
            }

            return StatusCode(403);
        }


        // PUT api/<BrandController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> EditBrand(int id, [FromBody] Brand brand)
        {
            var httpHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (httpHeader == null)
            {
                return BadRequest(new OperationResult("No autorizado", false));
            }

            var tokenValidation = TokenValidationResult.Verify(httpHeader);
            if (!tokenValidation.success)
            {
                return BadRequest(tokenValidation);
            }

            if (tokenValidation.dataSession != null && tokenValidation.dataSession.role == "admin")
            {
                if (brand == null)
                {
                    return BadRequest(new OperationResult("Datos enviados invalidos", false));
                }

                bool brandExist = _context.Brands.Any(c => c.Id == id);

                if (brandExist)
                {
                    brand.Id = id;

                    _context.Entry(brand).State = EntityState.Modified;

                    try
                    {
                        await _context.SaveChangesAsync();
                        return Ok(new OperationResult("Marca modificada correctamente!", true));
                    }
                    catch (Exception)
                    {
                        return StatusCode(500);
                    }
                }
                else
                {
                    return NotFound();
                }
            }

            return StatusCode(403);
        }

        // DELETE api/<BrandController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var httpHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (httpHeader == null)
            {
                return BadRequest(new OperationResult("No autorizado", false));
            }

            var tokenValidation = TokenValidationResult.Verify(httpHeader);
            if (!tokenValidation.success)
            {
                return BadRequest(tokenValidation);
            }

            if (tokenValidation.dataSession != null && tokenValidation.dataSession.role == "admin")
            {
                var brand = await _context.Brands.FindAsync(id);

                if (brand == null)
                {
                    return NotFound();
                }
                try
                {
                    var hasModel = await _context.Models.AnyAsync(m => m.BrandID == brand.Id);
                    if (hasModel) return Unauthorized(new OperationResult("Operación no realizada por motivos de que existen modelos asignadas a este registro."));

                    _context.Brands.Remove(brand);
                    await _context.SaveChangesAsync();

                    return Ok(new OperationResult("Marca eliminada correctamente!", true));
                }catch (Exception)
                {
                    return StatusCode(500);
                }
                
            }

            return StatusCode(403);
        }

        [HttpGet("search/{query}")]
        public async Task<IActionResult> Search(string query)
        {
            var httpHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();
            if (httpHeader == null) return BadRequest(new OperationResult("No autorizado", false));

            var tokenValidation = TokenValidationResult.Verify(httpHeader);
            if (!tokenValidation.success) return BadRequest(tokenValidation);

            var brands = await _context.Brands.Where(b => b.Id.ToString().Contains(query) || b.Nombre.Contains(query)).ToListAsync();

            if (tokenValidation.dataSession != null && tokenValidation.dataSession.role == "admin")
            {
                return Ok(brands);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
