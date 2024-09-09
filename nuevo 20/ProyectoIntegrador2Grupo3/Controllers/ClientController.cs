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
    public class ClientController : ControllerBase
    {
        private readonly CarDbContext _context;

        public ClientController(CarDbContext context)
        {
            _context = context;
        }

        // GET: api/<ClientController>
        [HttpGet]
        public async Task<IActionResult> GetAsync()
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
                var clients = await _context.Clients.ToListAsync();

                return Ok(clients);
            }
            else
            {
                return NotFound();
            }

        }

        // GET api/<ClientController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetClientByIdAsync(int id)
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
                bool clientExist = _context.Clients.Any(c => c.Id == id);

                if (clientExist)
                {
                    var client = await _context.Clients.FindAsync(id);

                    if (client == null)
                    {
                        return NotFound();
                    }

                    return Ok(new {success = true, client });
                }
                else
                {
                    return NotFound();
                }
            }

            return StatusCode(403);
        }

        // GET: api/<ClientController>
        [HttpGet("search/{query}")]
        public async Task<IActionResult> GetAsync(string query)
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
                var clients = await _context.Clients.Where(c => c.Id.ToString().Contains(query) || c.Nombre.Contains(query) || c.Apellido.Contains(query) || c.Correo.Contains(query)).ToListAsync();

                return Ok(clients);
            }
            else
            {
                return NotFound();
            }

        }

        // POST api/<ClientController> Create Client
        [HttpPost]
        public async Task<IActionResult> CreateClient([FromBody] Client client)
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
                if (client == null)
                {
                    return BadRequest(new OperationResult("Datos enviados invalidos", false));
                }

                var emailIsRegistered = await _context.Clients.AnyAsync(u => u.Correo == client.Correo);

                if (emailIsRegistered)
                {
                    return BadRequest(new OperationResult("Este Correo ya existe", false));
                }

                _context.Clients.Add(client);
                await _context.SaveChangesAsync();

                return Ok(new OperationResult("Cliente agregado Correctamente!", true));
            }

            return StatusCode(403);
        }

        // PUT api/<ClientController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> EditClient(int id, [FromBody] Client client)
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
                if (client == null)
                {
                    return BadRequest(new OperationResult("Datos enviados invalidos", false));
                }

                bool clientExist = _context.Clients.Any(c => c.Id == id);

                if (clientExist)
                {
                    client.Id = id;

                    _context.Entry(client).State = EntityState.Modified;

                    try
                    {
                        await _context.SaveChangesAsync();
                        return Ok(new OperationResult("Cliente modificado correctamente!", true));
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

        // DELETE api/<ClientController>/5
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

            if(tokenValidation.dataSession != null && tokenValidation.dataSession.role == "admin")
            {
                var client = await _context.Clients.FindAsync(id);

                if (client == null)
                {
                    return NotFound();
                }

                _context.Clients.Remove(client);
                await _context.SaveChangesAsync();

                return Ok(new OperationResult("Cliente eliminado correctamente!", true));
            }

            return StatusCode(403);
        }
    }
}
