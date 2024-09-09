using ListMarkApi.Models;
using ListMarkApi.Repository;
using ListMarkApi.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ListMarkApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListController :ControllerBase
    {
        private readonly IListRepository _listRepository;
        public ListController(IListRepository listRepository)
        {
            _listRepository = listRepository;
        }

        [HttpGet]
        public IActionResult GetList()
        {
            var ListList = _listRepository.GetList();

            return Ok(ListList);

        }

        [HttpGet("GetById")]
        public IActionResult GetListById([FromQuery] int id)
        {
            var List = _listRepository.GetList(id);

            if (List == null)
            {
                return NotFound();
            }

            return Ok(List);

        }

        [HttpGet("{name}", Name = "GetListByName")]
        public IActionResult GetListByName(string name)
        {
            var List = _listRepository.GetListByName(name);

            if (List == null)
            {
                return NotFound();
            }

            return Ok(List);

        }

        [HttpPost]
        public IActionResult CreateList([FromBody] List list)
        {
            if (list == null)
            {
                return BadRequest(ModelState);
            }
            if (_listRepository.ExistList(list.Name))
            {
                ModelState.AddModelError("", "The list is Exist");
                return StatusCode(500, ModelState);
            }

            if (!_listRepository.CreateList(list))
            {
                ModelState.AddModelError("", $"Error Saving{list.Name}");
                return StatusCode(500, ModelState);
            }

            return Ok();
        }

        [HttpPatch("{listId:int}", Name = "GetListById")]
        public IActionResult UpdateList(int listId, [FromBody] List list)
        {
            if (list == null || listId ==null)
            {
                return BadRequest(ModelState);
            }

            if (!_listRepository.UpdateList(list))
            {
                ModelState.AddModelError("", $"Error Update {list.Name}");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }

        [HttpDelete("{listId:int}", Name = "DeleteList")]
        public IActionResult DeleteList(int listId)
        {
            if (!_listRepository.ExistList(listId))
            {
                return NotFound();
            }

            var list = _listRepository.GetList(listId);

            if (!_listRepository.DeleteList(list))
            {
                ModelState.AddModelError("", $"Error Delete {listId}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}

