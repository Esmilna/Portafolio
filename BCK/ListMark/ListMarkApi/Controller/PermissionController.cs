using ListMarkApi.Models;
using ListMarkApi.Repository;
using ListMarkApi.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace ListMarkApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionController : ControllerBase
    {
        private readonly IPermissionRepository _permissionRepository;
        public PermissionController(IPermissionRepository permissionRepository)
        {
            _permissionRepository = permissionRepository;
        }

        [HttpGet]
        public IActionResult GetPermission()
        {
            var PermissionList = _permissionRepository.GetPermission();

            return Ok(PermissionList);

        }

        [HttpGet("GetById")]
        public IActionResult GetPermissionById([FromQuery] int id)
        {
            var Permission = _permissionRepository.GetPermission(id);

            if (Permission == null)
            {
                return NotFound();
            }

            return Ok(Permission);

        }

        [HttpGet("{name}", Name = "GetPermissionByName")]
        public IActionResult GetPermissionByName(string name)
        {
            var Permission = _permissionRepository.GetPermissionByName(name);

            if (Permission == null)
            {
                return NotFound();
            }

            return Ok(Permission);

        }

        [HttpPost]
        public IActionResult CreatePermission([FromBody] Permission permission)
        {
            if (permission == null)
            {
                return BadRequest(ModelState);
            }
            if (_permissionRepository.ExistPermission(permission.Name))
            {
                ModelState.AddModelError("", "The Permission is Exist");
                return StatusCode(500, ModelState);
            }

            if (!_permissionRepository.CreatePermission(permission))
            {
                ModelState.AddModelError("", $"Error Saving{permission.Name}");
                return StatusCode(500, ModelState);
            }

            return Ok();
        }

        [HttpPatch("{permissionId:int}", Name = "GetPermissionById")]
        public IActionResult UpdatePermission(int permissionId, [FromBody] Permission permission)
        {
            if (permission == null || permissionId ==null)
            {
                return BadRequest(ModelState);
            }

            if (!_permissionRepository.UpdatePermission(permission))
            {
                ModelState.AddModelError("", $"Error Update {permission.Name}");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }

        [HttpDelete("{permissionId:int}", Name = "DeletePermission")]
        public IActionResult DeletePermission(int permissionId)
        {
            if (!_permissionRepository.ExistPermission(permissionId))
            {
                return NotFound();
            }

            var permission = _permissionRepository.GetPermission(permissionId);

            if (!_permissionRepository.DeletePermission(permission))
            {
                ModelState.AddModelError("", $"Error Delete {permissionId}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}
