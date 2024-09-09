using ListMarkApi.Models;
using ListMarkApi.Repository;
using ListMarkApi.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ListMarkApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListDetailsController : ControllerBase
    {
        private readonly IListDetailsRepository _listdetailsRepository;
        public ListDetailsController(IListDetailsRepository listdetailsRepository)
        {
            _listdetailsRepository = listdetailsRepository;

        }

        [HttpGet]
        public IActionResult GetListDetails()
        {
            var ListDetailsList = _listdetailsRepository.GetListDetails();

            return Ok(ListDetailsList);

        }

        [HttpGet("GetById")]
        public IActionResult GetListDetailsById([FromQuery] int id)
        {
            var ListDetails = _listdetailsRepository.GetListDetails(id);

            if (ListDetails == null)
            {
                return NotFound();
            }

            return Ok(ListDetails);

        }


        [HttpPost]
        public IActionResult CreateListDetails([FromBody] ListDetails listdetails)
        {
            if (listdetails == null)
            {
                return BadRequest(ModelState);
            }
            if (_listdetailsRepository.ExistListDetails(listdetails.Id))
            {
                ModelState.AddModelError("", "The ListDetails is Exist");
                return StatusCode(500, ModelState);
            }

            if (!_listdetailsRepository.CreateListDetails(listdetails))
            {
                ModelState.AddModelError("", $"Error Saving{listdetails.Id}");
                return StatusCode(500, ModelState);
            }

            return Ok();
        }

        [HttpPatch("{listdetailsId:int}", Name = "GetListDetailsById")]
        public IActionResult UpdateListDetails(int listdetailsId, [FromBody] ListDetails listdetails)
        {
            if (listdetails == null || listdetailsId ==null)
            {
                return BadRequest(ModelState);
            }

            if (!_listdetailsRepository.UpdateListDetails(listdetails))
            {
                ModelState.AddModelError("", $"Error Update {listdetails.Id}");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }

        [HttpDelete("{listdetailsId:int}", Name = "DeleteListDetails")]
        public IActionResult DeleteListDetails(int listdetailsId)
        {
            if (!_listdetailsRepository.ExistListDetails(listdetailsId))
            {
                return NotFound();
            }

            var listdetails = _listdetailsRepository.GetListDetails(listdetailsId);

            if (!_listdetailsRepository.DeleteListDetails(listdetails))
            {
                ModelState.AddModelError("", $"Error Delete {listdetailsId}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}
