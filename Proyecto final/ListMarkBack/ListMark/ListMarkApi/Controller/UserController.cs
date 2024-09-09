using ListMarkApi.Models;
using ListMarkApi.Repository;
using ListMarkApi.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ListMarkApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]

    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult GetUser()
        {
            var UserList = _userRepository.GetUser();

            return Ok(UserList);

        }

        [HttpGet("GetById")]
        public IActionResult GetUserById([FromQuery] int id)
        {
            var User = _userRepository.GetUser(id);

            if (User == null)
            {
                return NotFound();
            }

            return Ok(User);

        }

        [HttpGet("{name}", Name = "GetUserByName")]
        public IActionResult GetUserByName(string name)
        {
            var User = _userRepository.GetUserByName(name);

            if (User == null)
            {
                return NotFound();
            }

            return Ok(User);

        }

        [HttpPost]
        public IActionResult CreateBrand([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest(ModelState);
            }
            if (_userRepository.ExistUser(user.Name))
            {
                ModelState.AddModelError("", "The User is Exist");
                return StatusCode(500, ModelState);
            }

            if (!_userRepository.CreateUser(user))
            {
                ModelState.AddModelError("", $"Error Saving{user.Name}");
                return StatusCode(500, ModelState);
            }

            return Ok();
        }

        [HttpPatch("{userId:int}", Name = "GetUserById")]
        public IActionResult UpdateUser(int UserId, [FromBody] User user)
        {
            if (user == null || UserId ==null)
            {
                return BadRequest(ModelState);
            }

            if (!_userRepository.UpdateUser(user))
            {
                ModelState.AddModelError("", $"Error Update {user.Name}");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }

        [HttpDelete("{userId:int}", Name = "DeleteUser")]
        public IActionResult DeleteUser(int userId)
        {
            if (!_userRepository.ExistUser(userId))
            {
                return NotFound();
            }

            var user = _userRepository.GetUser(userId);

            if (!_userRepository.DeleteUser(user))
            {
                ModelState.AddModelError("", $"Error Delete {userId}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}

