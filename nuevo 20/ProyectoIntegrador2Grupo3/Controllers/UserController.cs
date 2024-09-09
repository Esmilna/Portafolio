using DB.Data.Entities;
using DB.Data.Requests;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SistemaDeInventarioDeVentaDeVehiculos.Data.Context;
using SistemaDeInventarioDeVentaDeVehiculos.Data.Entities;
using SistemaDeInventarioDeVentaDeVehiculos.Utils;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using BC = BCrypt.Net.BCrypt;   

namespace SistemaDeInventarioDeVentaDeVehiculos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly CarDbContext _context;
        private readonly IConfiguration _configuration;

        public UserController(CarDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
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
            var httpHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (httpHeader == null)
            {
                return BadRequest(new OperationResult("No autorizado", false));
            }

            var tokenValidation = Utils.TokenValidationResult.Verify(httpHeader);
            if (!tokenValidation.success)
            {
                return BadRequest(tokenValidation);
            }

            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // GET api/<UserController>/current
        [HttpGet("current")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var httpHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (httpHeader == null)
            {
                return BadRequest(new OperationResult("No autorizado", false));
            }

            var tokenValidation = Utils.TokenValidationResult.Verify(httpHeader);
            if (!tokenValidation.success || tokenValidation.dataSession == null)
            {
                return BadRequest(tokenValidation);
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Correo == tokenValidation.dataSession.email);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // POST api/<UserController>/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            // Verificar si el correo electrónico ya está registrado
            if (await _context.Users.AnyAsync(u => u.Correo == user.Correo))
            {
                return BadRequest(new OperationResult("Este correo electrónico ya ha sido registrado.", false));
            }

            // Hashear la contraseña con BCrypt
            string hashedPassword = BC.HashPassword(user.Password);

            user.Password = hashedPassword;

            // Agregar el usuario a la base de datos
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new OperationResult("Cuenta de usuario creada exitosamente.", true));
        }

        // Post api/<UserController>/login
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login([FromBody] RequestLogin request)
        {
            //Authenticate User

            try
            {
                string email = request.Email;
                string password = request.Password;

                User? user = await _context.Users.FirstOrDefaultAsync(user => user.Correo.Equals(email) );

                if (user == null)
                {
                    return BadRequest(new { message = "Correo no existe", success = false });
                };

                bool passwordMatches = BC.Verify(password, user.Password);

                if (!passwordMatches)
                {
                    return BadRequest(new OperationResult("Credenciales inválidas", false));
                }


                var jwt = _configuration.GetSection("Jwt").Get<Jwt>();

#pragma warning disable CS8604 // Possible null reference argument.
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, jwt.Subject),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("email", user.Correo),
                    new Claim("role", user.Role)
                };
#pragma warning restore CS8604 // Possible null reference argument.

#pragma warning disable CS8604 // Possible null reference argument.
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key));

                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    jwt.Issuer,
                    jwt.Audience,
                    claims,
                    expires: DateTime.Now.AddMinutes(60),
                    signingCredentials: signIn
                );

                return Ok(new {message = "Login exitoso", success = true, token = new JwtSecurityTokenHandler().WriteToken(token)});
            }
            catch (Exception ex){
                return BadRequest(new OperationResult(ex.Message.ToString(), false));
            }
        }

        [HttpGet("verify-token")]
        public IActionResult VerifySession()
        {
            try {
                var authheader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();
                string? token = authheader?.Split(' ').Last();
                if(token == "Bearer")
                {
                    return BadRequest(new { message = "token invalido" });
                }

#pragma warning disable CS8604 // Possible null reference argument.
                bool isExpired = Jwt.IsTokenExpired(token);

                if (!isExpired)
                {
                    UserData dataSession = Jwt.GetUserData(token);

                    var user = _context.Users.FirstOrDefault(u => u.Correo == dataSession.email);

                    if(user != null){
                        dataSession.avatar = user.ImageURL;
                        dataSession.fullName = $"{user.Nombre} {user.Apellido}";
                    }
                    
                    return Ok(new { message = "Token válido", success = true, dataSession });
                }
                return BadRequest(new { message = "token invalido" });
            }catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<User>> EditUser(int id, [FromBody] RequestProfile request)
        {
            var httpHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (httpHeader == null)
            {
                return BadRequest(new OperationResult("No autorizado", false));
            }

            var tokenValidation = Utils.TokenValidationResult.Verify(httpHeader);
            if (!tokenValidation.success)
            {
                return BadRequest(tokenValidation);
            }


            var user = await _context.Users.FirstOrDefaultAsync(c => c.Id == id);

            if (user != null)
            {

                try
                {
                    user.Nombre = request.Nombre;
                    user.Apellido = request.Apellido;
                    user.Direccion = request.Direccion;
                    user.Telefono = request.Telefono;
                    user.Correo = request.Correo;
                    
                    byte[]? imageData = request.ImageData;

                    if (imageData != null && imageData.Length > 0)
                    {

                        var url = request.ImageURL;

                        var cloudinaryService = new CloudinaryService(_configuration);
                        var imageUploadResult = cloudinaryService.UploadImage(imageData, request.Nombre);
                        imageUploadResult.Wait();

                        user.ImageURL = imageUploadResult.Result;

                        if (url != null && url.Length > 0)
                        {
                            var regex = new Regex(@"v\d+/(?<publicId>.+)");
                            var match = regex.Match(url);
                            var publicId = match.Groups["publicId"].Value;

                            await cloudinaryService.DestroyImage(publicId);
                        }

                        _context.Entry(user).State = EntityState.Modified;
                        await _context.SaveChangesAsync();
                        return Ok(new OperationResult("Perfil actualizado correctamente!", true));
                    }

                    _context.Entry(user).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                    return Ok(new OperationResult("Perfil actualizado correctamente!", true));
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


        // PUT api/<UserController>/edit-password
        [HttpPut("edit-password")]
        public async Task<IActionResult> EditPassword([FromBody] EditPasswordRequest request)
        {
            try
            {
                var httpHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

                if (httpHeader == null)
                {
                    return BadRequest(new OperationResult("No autorizado", false));
                }

                var tokenValidation = Utils.TokenValidationResult.Verify(httpHeader);
                if (!tokenValidation.success)
                {
                    return BadRequest(tokenValidation);
                }

                if (tokenValidation.dataSession == null)
                {
                    return BadRequest("Datos de sesion invalidos");
                }

                var user = await _context.Users.FirstOrDefaultAsync(u => u.Correo == tokenValidation.dataSession.email);

                if( user == null ) {
                    return BadRequest("Usuario no encontrado");
                }

                string? oldPassword = request.OldPassword;
                string? newPassword = request.NewPassword;

                if(oldPassword.IsNullOrEmpty() || newPassword.IsNullOrEmpty())
                {
                    return BadRequest(new OperationResult("Campos faltantes", false));
                }

                bool oldPasswordIsValid = BC.Verify(oldPassword, user.Password);

                if (!oldPasswordIsValid)
                {
                    return BadRequest(new OperationResult("Contraseña antigua no válida", false));
                }

                if(oldPassword == newPassword)
                {
                    return BadRequest(new OperationResult("La contraseña nueva ingresada es la misma que la anterior!"));
                }

                user.Password = BC.HashPassword(newPassword);

                await _context.SaveChangesAsync();

                return Ok(new OperationResult("Contraseña actualizada con exito!", true));

            }catch(Exception){
                return StatusCode(500);
            }
        }

        //POST api/<UserController>/upload
        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile image)
        {

            try
            {
                if (image == null || image.Length == 0)
                {
                    return BadRequest(new OperationResult("No hay archivos seleccionados", false));
                }

                byte[] imageData;

                using (var stream = new MemoryStream())
                {
                    await image.CopyToAsync(stream);
                    imageData = stream.ToArray();
                }

                string base64string = Convert.ToBase64String(imageData);

                return Ok(new OperationResult("datos imagen", true, base64string));
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
    }
}
