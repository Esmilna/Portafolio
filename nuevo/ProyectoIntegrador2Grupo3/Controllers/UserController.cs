using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaDeInventarioDeVentaDeVehiculos.Data.Context;
using SistemaDeInventarioDeVentaDeVehiculos.Data.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SistemaDeInventarioDeVentaDeVehiculos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly CarDbContext _context;

        public UserController(CarDbContext context)
        {
            _context = context; 
        }

        // GET: api/<UserController>
        [HttpGet]
        
        public async Task<IActionResult> GetAsync() {
            //TODO add role validation and error code 

            var users = await _context.Users.ToListAsync();

            return Ok(users);
        }  

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserByIdAsync(int id)
        {
            //TODO add role validation and error code 

            var user = await _context.Users.FindAsync(id);

            return Ok(user);
        }

        // POST api/<UserController>
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            //TODO Create User

            // Verificar si el correo electrónico ya está registrado
            if (await _context.Users.AnyAsync(u => u.Correo == user.Correo))
            {
                return BadRequest("Este correo electrónico ya ha sido registrado.");
            }

            // Hashear la contraseña con BCrypt
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.Password);

            // Agregar el usuario a la base de datos
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Cuenta de usuario creada exitosamente." });

        }

        // POST api/<UserController>
        [HttpPost]
        public void GetCurrentRole([FromBody] int id)
        {
            //TODO - get current role to validate some required operations in admin privileges
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
            //TODO Edit User
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            //TODO Delete User (soft delete)
        }
    }
}
