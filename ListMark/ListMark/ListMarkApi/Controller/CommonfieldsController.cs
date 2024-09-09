using ListMarkApi.Models;
using ListMarkApi.Repository;
using ListMarkApi.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
namespace ListMarkApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonfieldsController : ControllerBase
    {
        private readonly ICommonfieldsRepository _commonfieldsRepository;
        public CommonfieldsController(ICommonfieldsRepository commonfieldsRepository)
        {
            _commonfieldsRepository = commonfieldsRepository;
            
        }

        [HttpGet]
        public IActionResult GetCommonfields()
        {
            var CommonfieldsList = _commonfieldsRepository.GetCommonfields();

            return Ok(CommonfieldsList);

        }

        [HttpGet("GetById")]
        public IActionResult GetCommonfieldsById([FromQuery] int id)
        {
            var Commonfields = _commonfieldsRepository.GetCommonfields(id);

            if (Commonfields == null)
            {
                return NotFound();
            }

            return Ok(Commonfields);

        }


        [HttpPost]
        public IActionResult CreateCommonfields([FromBody] Commonfields commonfields)
        {
            if (commonfields == null)
            {
                return BadRequest(ModelState);
            }
            if (_commonfieldsRepository.ExistCommonfields(commonfields.Id))
            {
                ModelState.AddModelError("", "The Commonfields is Exist");
                return StatusCode(500, ModelState);
            }

            if (!_commonfieldsRepository.CreateCommonfields(commonfields))
            {
                ModelState.AddModelError("", $"Error Saving{commonfields.Id}");
                return StatusCode(500, ModelState);
            }

            return Ok();
        }

        [HttpPatch("{commonfieldsId:int}", Name = "GetCommonfieldsById")]
        public IActionResult UpdateCommonfields(int commonfieldsId, [FromBody] Commonfields commonfields)
        {
            if (commonfields == null || commonfieldsId ==null)
            {
                return BadRequest(ModelState);
            }

            if (!_commonfieldsRepository.UpdateCommonfields(commonfields))
            {
                ModelState.AddModelError("", $"Error Update {commonfields.Id}");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }

        [HttpDelete("{commonfieldsId:int}", Name = "DeleteCommonfields")]
        public IActionResult DeleteCommonfields(int commonfieldsId)
        {
            if (!_commonfieldsRepository.ExistCommonfields(commonfieldsId))
            {
                return NotFound();
            }

            var commonfields = _commonfieldsRepository.GetCommonfields(commonfieldsId);

            if (!_commonfieldsRepository.DeleteCommonfields(commonfields))
            {
                ModelState.AddModelError("", $"Error Delete {commonfieldsId}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}
