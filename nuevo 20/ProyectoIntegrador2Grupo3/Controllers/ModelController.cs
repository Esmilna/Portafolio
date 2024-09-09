using DB.Data.Entities;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaDeInventarioDeVentaDeVehiculos.Data.Context;
using SistemaDeInventarioDeVentaDeVehiculos.Utils;
using System.Text.Json;
using System.Text.Json.Serialization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SistemaDeInventarioDeVentaDeVehiculos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModelController : ControllerBase
    {
        private readonly CarDbContext _context;


        private readonly JsonSerializerOptions jsonOptions = new JsonSerializerOptions
        {
            ReferenceHandler = ReferenceHandler.Preserve,
        };

        public ModelController(CarDbContext context)
        {
            _context = context;
        }

        // GET: api/<ModelController>
        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            try
            {
                var httpHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();
                if (httpHeader == null) return BadRequest(new OperationResult("No autorizado", false));

                var tokenValidation = TokenValidationResult.Verify(httpHeader);
                if (!tokenValidation.success) return BadRequest(tokenValidation);

                #pragma warning disable CS8602
                var models = await _context.Models.Select(m => new
                {
                    m.Id,
                    m.Nombre,
                    m.BrandID,
                    brand = new
                    {
                        m.Brand.Id,
                        m.Brand.Nombre
                    }
                }).ToListAsync();
#pragma warning restore CS8602 // Dereference of a possibly null reference.

                if (tokenValidation.dataSession != null && tokenValidation.dataSession.role == "admin")
                {
                    var json = JsonSerializer.Serialize(models, jsonOptions);

                    return Ok(json);
                }
                else
                {
                    return NotFound();
                }

            }catch (Exception)
            {
                return StatusCode(500);
            }
        }

        // GET api/<ModelController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetModelByIdAsync(int id)
        {
            var httpHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (httpHeader == null) return BadRequest(new OperationResult("No autorizado", false));

            var tokenValidation = TokenValidationResult.Verify(httpHeader);
            if (!tokenValidation.success) return BadRequest(tokenValidation);

            if (tokenValidation.dataSession != null && tokenValidation.dataSession.role == "admin")
            {
                bool modelExist = _context.Models.Any(c => c.Id == id);

                if (modelExist)
                {
                    var model = await _context.Models.FindAsync(id);

                    if (model == null) return NotFound();

                    return Ok(new { success = true, model });
                }

                else return NotFound();
            }

            return StatusCode(403);
        }

        // GET: api/<ModelController>
        [HttpGet("search/{query}")]
        public async Task<IActionResult> GetAsync(string query)
        {
            try
            {
                var httpHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();
                if (httpHeader == null) return BadRequest(new OperationResult("No autorizado", false));

                var tokenValidation = TokenValidationResult.Verify(httpHeader);
                if (!tokenValidation.success) return BadRequest(tokenValidation);

#pragma warning disable CS8602
                var models = await _context.Models.Select(m => new
                {
                    m.Id,
                    m.Nombre,
                    m.BrandID,
                    brand = new
                    {
                        m.Brand.Id,
                        m.Brand.Nombre
                    }
                }).Where(m => m.Id.ToString().Contains(query) || m.Nombre.Contains(query)).ToListAsync();
#pragma warning restore CS8602 // Dereference of a possibly null reference.

                if (tokenValidation.dataSession != null && tokenValidation.dataSession.role == "admin")
                {
                    var json = JsonSerializer.Serialize(models, jsonOptions);

                    return Ok(json);
                }
                else
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        // POST api/<ModelController> Create Model
        [HttpPost]
        public async Task<IActionResult> CreateModel([FromBody] Model model)
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
                if (model == null)
                {
                    return BadRequest(new OperationResult("Datos enviados invalidos", false));
                }

                bool brandExist = await _context.Brands.AnyAsync(b => b.Id == model.BrandID);
                var modelIsRegistered = await _context.Models.AnyAsync(m => m.Nombre == model.Nombre);

                if (!brandExist) return BadRequest(new OperationResult("Id de marca no existe", false));
                
                if (modelIsRegistered) return BadRequest(new OperationResult("El modelo ya existe", false));

                _context.Models.Add(model);
                await _context.SaveChangesAsync();

                return Ok(new OperationResult("Modelo agregado Correctamente!", true));
            }

            return StatusCode(403);
        }


        // PUT api/<ModelController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> EditModel(int id, [FromBody] Model model)
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
                if (model == null)
                {
                    return BadRequest(new OperationResult("Datos enviados invalidos", false));
                }

                bool brandExist = await _context.Brands.AnyAsync(b => b.Id == model.BrandID);
                bool modelExist = await _context.Models.AnyAsync(m => m.Id == id);

                if (!brandExist) return BadRequest(new OperationResult("Id de marca no existe", false));

                if (modelExist)
                {
                    model.Id = id;

                    _context.Entry(model).State = EntityState.Modified;

                    try
                    {
                        await _context.SaveChangesAsync();
                        return Ok(new OperationResult("Modelo modificado correctamente!", true));
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

        // DELETE api/<ModelController>/5
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
                var model = await _context.Models.FindAsync(id);

                if (model == null)
                {
                    return NotFound();
                }

                bool hasCar = await _context.Cars.AnyAsync(c => c.ModelID == id);

                if (hasCar) return Unauthorized(new OperationResult("Operación no realizada por motivos de que existen carros asignados a este registro."));

                _context.Models.Remove(model);
                await _context.SaveChangesAsync();

                return Ok(new OperationResult("Modelo eliminado correctamente!", true));
            }

            return StatusCode(403);
        }
    }
}
