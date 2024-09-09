using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DB.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaDeInventarioDeVentaDeVehiculos.Data.Context;
using SistemaDeInventarioDeVentaDeVehiculos.Utils;
using System.Text.Json;
using System.Text.Json.Serialization;
using static System.Net.Mime.MediaTypeNames;
using System.Text.RegularExpressions;
using DB.Data.Requests;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SistemaDeInventarioDeVentaDeVehiculos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly CarDbContext _context;
        private readonly IConfiguration _configuration;

        private readonly JsonSerializerOptions jsonOptions = new JsonSerializerOptions
        {
            ReferenceHandler = ReferenceHandler.Preserve
        };

        public CarController(CarDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // GET: api/<CarController>
        [HttpGet("admin/search")]
        public async Task<IActionResult> GetAsync()
        {
            try
            {
                var httpHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();
                if (httpHeader == null) return BadRequest(new OperationResult("No autorizado", false));

                var tokenValidation = TokenValidationResult.Verify(httpHeader);
                if (!tokenValidation.success) return BadRequest(tokenValidation);

#pragma warning disable CS8602
                var cars = await _context.Cars.Select(c => new {
                    c.Id,
                    c.Nombre,
                    c.ImageURL,
                    model = new {
                        c.Model.Id,
                        c.Model.Nombre
                    },
                    brand = new {
                        c.Model.Brand.Id,
                        c.Model.Brand.Nombre
                    },
                    c.Color,
                    c.Anio,
                    c.Chasis,
                    c.Placa,
                    c.Precio,
                    c.Stock,
                }).ToListAsync();
#pragma warning restore CS8602

                if (tokenValidation.dataSession != null)
                {
                    var json = JsonSerializer.Serialize(cars, jsonOptions);

                    return Ok(cars);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500);
            }

        }

        // GET: api/<CarController>/search/query
        [HttpGet("admin/search/{query}")]
        public async Task<IActionResult> GetAsync(string query)
        {
            try
            {
                var httpHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();
                if (httpHeader == null) return BadRequest(new OperationResult("No autorizado", false));

                var tokenValidation = TokenValidationResult.Verify(httpHeader);
                if (!tokenValidation.success) return BadRequest(tokenValidation);

#pragma warning disable CS8602
                var cars = await _context.Cars.Select(c => new {
                    c.Id,
                    c.Nombre,
                    c.ImageURL,
                    model = new
                    {
                        c.Model.Id,
                        c.Model.Nombre
                    },
                    brand = new
                    {
                        c.Model.Brand.Id,
                        c.Model.Brand.Nombre
                    },
                    c.Color,
                    c.Anio,
                    c.Chasis,
                    c.Placa,
                    c.Precio,
                    c.Stock,
                }).Where(c => c.Id.ToString().Contains(query) || c.Nombre.Contains(query)).ToListAsync();
#pragma warning restore CS8602

                if (tokenValidation.dataSession != null)
                {
                    var json = JsonSerializer.Serialize(cars, jsonOptions);

                    return Ok(cars);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500);
            }

        }

        // GET api/<CarController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCarByIdAsync(int id)
        {
            
            bool carExist = _context.Cars.Any(c => c.Id == id);

            if (carExist)
            {
                var car = await _context.Cars.Include(c => c.Model.Brand).FirstOrDefaultAsync(c => c.Id == id);

                var json = JsonSerializer.Serialize(car, jsonOptions);

                if (car == null) return NotFound();

                return Ok(new { success = true, data = json });
            }

            else return NotFound();
  
        }

        // POST api/<CarController> Create Car
        [HttpPost]
        public async Task<IActionResult> CreateCar([FromBody] Car car)
        {
            try
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
                    if (car == null)
                    {
                        return BadRequest(new OperationResult("Datos enviados invalidos", false));
                    }

                    bool modelExist = await _context.Models.AnyAsync(m => m.Id == car.ModelID);
                    if (!modelExist) return BadRequest(new OperationResult("Id del modelo no existe", false));

                    bool chasisExist = await _context.Cars.AnyAsync(c => c.Chasis == car.Chasis);
                    if (chasisExist) return BadRequest(new OperationResult("codigo de chasis ya existe", false));

                    bool placaExist = await _context.Cars.AnyAsync(c => c.Placa == car.Placa);
                    if (placaExist) return BadRequest(new OperationResult("Placa del vehiculo ya existe", false));

                    bool nombreExist = await _context.Cars.AnyAsync(c => c.Nombre.ToLower() == car.Nombre.ToLower());
                    if (nombreExist) return BadRequest(new OperationResult("El nombre ingresado del vehiculo ya existe", false));


                    byte[]? imageData = car.ImageData;

                    if (imageData != null && imageData.Length > 0)
                    {
                        var cloudinaryService = new CloudinaryService(_configuration);
                        var imageUploadResult = cloudinaryService.UploadImage(imageData, car.Nombre);

                        imageUploadResult.Wait();

                        car.ImageURL = imageUploadResult.Result;
                    }



                    _context.Cars.Add(car);
                    await _context.SaveChangesAsync();

                    return Ok(new OperationResult("Carro añadido Correctamente!", true));
                }

                return StatusCode(403);
            } catch (Exception)
            {
                return StatusCode(500);
            }
        }


        // PUT api/<ModelController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> EditCar(int id, [FromBody] Car car)
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
                if (car == null)
                {
                    return BadRequest(new OperationResult("Datos enviados invalidos", false));
                }

                Car? originalCar = await _context.Cars.FirstOrDefaultAsync(c => c.Id == id);

                if (originalCar == null) {
                    return NotFound();
                }

                _context.Entry(originalCar).State = EntityState.Detached;

                bool modelExist = await _context.Models.AnyAsync(m => m.Id == car.ModelID);
                if (!modelExist) return BadRequest(new OperationResult("Id del modelo no existe", false));

                bool chasisExist = await _context.Cars.AnyAsync(c => c.Chasis == car.Chasis);
                if (originalCar.Chasis != car.Chasis && chasisExist) return BadRequest(new OperationResult("codigo de chasis ya existe", false));

                bool placaExist = await _context.Cars.AnyAsync(c => c.Placa == car.Placa);
                if (originalCar.Placa != car.Placa && placaExist) return BadRequest(new OperationResult("Placa del vehiculo ya existe", false));

                try
                {
                    byte[]? imageData = car.ImageData;

                    car.Id = id;

                    if (imageData != null && imageData.Length > 0)
                    {

                        var url = car.ImageURL;

                        var cloudinaryService = new CloudinaryService(_configuration);
                        var imageUploadResult = cloudinaryService.UploadImage(imageData, car.Nombre);
                        imageUploadResult.Wait();

                        car.ImageURL = imageUploadResult.Result;

                        _context.Entry(car).State = EntityState.Modified;
                        await _context.SaveChangesAsync();

                        if (url != null && url.Length > 0)
                        {
                            var regex = new Regex(@"v\d+/(?<publicId>.+)");
                            var match = regex.Match(url);
                            var publicId = match.Groups["publicId"].Value;

                            await cloudinaryService.DestroyImage(publicId);
                        }

                        return Ok(new OperationResult("Carro modificado correctamente!", true));
                    }


                    _context.Entry(car).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                    return Ok(new OperationResult("Carro modificado correctamente!", true));
                }
                catch (Exception)
                {
                    return StatusCode(500);
                }
            }
            return StatusCode(403);
        }

        // DELETE api/<CarController>/5
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
                var car = await _context.Cars.FindAsync(id);

                if (car == null)
                {
                    return NotFound();
                }

                try
                {
                    _context.Cars.Remove(car);
                    await _context.SaveChangesAsync();

                    return Ok(new OperationResult("Coche eliminado correctamente!", true));
                } catch (DbUpdateException dbExc)
                {
                    return BadRequest(new OperationResult("El vehiculo actual no puede ser eliminado debido a que ya existe una venta realizada por ella"));

                }
                catch (Exception) {
                    return StatusCode(500);
                }
            }

            return StatusCode(403);
        }

        //POST api/<CarController>/upload
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



        //GET api/<CarController>/search
        [HttpGet("search/{query}")]
        public async Task<IActionResult> SearchCars(string query) { 
            try
            {
                var cars = await _context.Cars.Where(c => c.Estatus == "A" && (c.Id.ToString().Contains(query) || c.Nombre.Contains(query))).Select(c => new{
                    c.Id,
                    c.Nombre,
                    c.ImageURL,
                    model = new {
                        c.Model.Id,
                        c.Model.Nombre
                    },
                    brand = new {
                        c.Model.Brand.Id,
                        c.Model.Brand.Nombre
                    },
                    c.Color,
                    c.Anio,
                    c.Chasis,
                    c.Placa,
                    c.Precio,
                    c.Stock,
                }).ToListAsync();

                var json = JsonSerializer.Serialize(cars, jsonOptions);

                return Ok(cars);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500);
            }
        }

        //GET api/<CarController>/search
        [HttpGet("search")]
        public async Task<IActionResult> SearchCars()
        {

            try
            {
                var cars = await _context.Cars.Where(c => c.Estatus == "A").Select(c => new {
                    c.Id,
                    c.Nombre,
                    c.ImageURL,
                    model = new
                    {
                        c.Model.Id,
                        c.Model.Nombre
                    },
                    brand = new
                    {
                        c.Model.Brand.Id,
                        c.Model.Brand.Nombre
                    },
                    c.Color,
                    c.Anio,
                    c.Chasis,
                    c.Placa,
                    c.Precio,
                    c.Stock,
                }).ToListAsync();

                var json = JsonSerializer.Serialize(cars, jsonOptions);

                return Ok(cars);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500);
            }
        }
    }
}
