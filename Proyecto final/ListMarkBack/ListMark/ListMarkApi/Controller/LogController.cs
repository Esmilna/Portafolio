using ListMarkApi.Models;
using ListMarkApi.Repository;
using ListMarkApi.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ListMarkApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogController : ControllerBase
    {
        private readonly ILogRepository _logRepository;
        public LogController(ILogRepository logRepository)
        {
            _logRepository = logRepository;
        }

        [HttpGet]
        public IActionResult GetBrands()
        {
            var LogList = _logRepository.GetLog();

            return Ok(LogList);

        }

        [HttpGet("GetById")]
        public IActionResult GetLogById([FromQuery] int id)
        {
            var Log = _logRepository.GetLog(id);

            if (Log == null)
            {
                return NotFound();
            }

            return Ok(Log);

        }

        [HttpGet("{code}", Name = "GetLogByCode")]
        public IActionResult GetLogByName(int code)
        {
            var Log = _logRepository.GetLogByCode(code);

            if (Log == null)
            {
                return NotFound();
            }

            return Ok(Log);

        }

        [HttpPost]
        public IActionResult CreateLog([FromBody] Log log)
        {
            if (log == null)
            {
                return BadRequest(ModelState);
            }
            if (_logRepository.ExistLog(log.Code))
            {
                ModelState.AddModelError("", "The Log is Exist");
                return StatusCode(500, ModelState);
            }

            if (!_logRepository.CreateLog(log))
            {
                ModelState.AddModelError("", $"Error Saving{log.Code}");
                return StatusCode(500, ModelState);
            }

            return Ok();
        }

        [HttpPatch("{logId:int}", Name = "GetLogById")]
        public IActionResult UpdateLog(int logId, [FromBody] Log log)
        {
            if (log == null || logId ==null)
            {
                return BadRequest(ModelState);
            }

            if (!_logRepository.UpdateLog(log))
            {
                ModelState.AddModelError("", $"Error Update {log.Code}");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }

        [HttpDelete("{logId:int}", Name = "DeleteLog")]
        public IActionResult DeleteLog(int logId)
        {
            if (!_logRepository.ExistLog(logId))
            {
                return NotFound();
            }

            var log = _logRepository.GetLog(logId);

            if (!_logRepository.DeleteLog(log))
            {
                ModelState.AddModelError("", $"Error Delete {logId}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}

