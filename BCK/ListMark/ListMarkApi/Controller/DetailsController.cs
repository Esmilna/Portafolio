using ListMarkApi.Models;
using ListMarkApi.Repository;
using ListMarkApi.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
namespace ListMarkApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetailsController : ControllerBase
    {
        private readonly IDetailsRepository _detailsRepository;
        public DetailsController(IDetailsRepository detailsRepository)
        {
            _detailsRepository = detailsRepository;

        }

        [HttpGet]
        public IActionResult GetDetails()
        {
            var DetailsList = _detailsRepository.GetDetails();

            return Ok(DetailsList);

        }

        [HttpGet("GetById")]
        public IActionResult GetDetailsById([FromQuery] int id)
        {
            var Details = _detailsRepository.GetDetails(id);

            if (Details == null)
            {
                return NotFound();
            }

            return Ok(Details);

        }


        [HttpPost]
        public IActionResult CreateDetails([FromBody] Details details)
        {
            if (details == null)
            {
                return BadRequest(ModelState);
            }
            if (_detailsRepository.ExistDetails(details.Id))
            {
                ModelState.AddModelError("", "The Details is Exist");
                return StatusCode(500, ModelState);
            }

            if (!_detailsRepository.CreateDetails(details))
            {
                ModelState.AddModelError("", $"Error Saving{details.Id}");
                return StatusCode(500, ModelState);
            }

            return Ok();
        }

        [HttpPatch("{detailsId:int}", Name = "GetDetailsById")]
        public IActionResult UpdateDetails(int detailsId, [FromBody] Details details)
        {
            if (details == null || detailsId ==null)
            {
                return BadRequest(ModelState);
            }

            if (!_detailsRepository.UpdateDetails(details))
            {
                ModelState.AddModelError("", $"Error Update {details.Id}");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }

        [HttpDelete("{detailsId:int}", Name = "DeleteDetails")]
        public IActionResult DeleteDetails(int detailsId)
        {
            if (!_detailsRepository.ExistDetails(detailsId))
            {
                return NotFound();
            }

            var details = _detailsRepository.GetDetails(detailsId);

            if (!_detailsRepository.DeleteDetails(details))
            {
                ModelState.AddModelError("", $"Error Delete {detailsId}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}

