using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using ToDoApi.Models;

namespace ToDoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : Controller
    {
        private readonly ToDoDbContext _context;

        public ToDoController(ToDoDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("all")]
        public IEnumerable<ToDo> GetAll()
        {
            return _context.ToDos;
        }

        [HttpGet]
        [Route("completed")]
        public IEnumerable<ToDo> GetCompleted()
        {
            return _context.ToDos.Where(e => e.Completed == true);
        }

        [HttpGet]
        [Route("notcompleted")]
        public IEnumerable<ToDo> GetNotCompleted()
        {
            return _context.ToDos.Where(e => e.Completed == false);
        }

        // POST: ToDoController/Create
        [HttpPost]
        [Route("create/{title}")]
        public async Task<IActionResult> Create(string title)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if(title != null && title.Length > 2)
            {
                _context.ToDos.Add(new ToDo { Title = title });
                await _context.SaveChangesAsync();
            }

            return Ok();
        }

        [HttpPost]
        [Route("updateState/{id}%{completed}")]
        public async Task<IActionResult> UpdateState(int id, bool completed)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var item = await _context.ToDos.Where(e => e.Id == id).FirstOrDefaultAsync();

            if(item != null)
            {
                item.Completed = completed;
            }

            await _context.SaveChangesAsync();

            return Ok(item);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var item = await _context.ToDos.Where(todo => todo.Id == id).FirstOrDefaultAsync();
            if (item == null)
            {
                return NotFound();
            }

            _context.ToDos.Remove(item);
            await _context.SaveChangesAsync();

            return Ok(item);
        }

        [HttpDelete]
        [Route("delete/completed")]
        public async Task<ActionResult> DeleteCompleted()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var listItem = await _context.ToDos.Where(todo => todo.Completed == true).ToListAsync();
            if (listItem == null)
            {
                return Ok();
            }

            foreach(var item in listItem)
            {
                _context.ToDos.Remove(item);
            }
            
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
