using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project1.Entitys;
using Project1.Interface;
using System.Collections.Generic;

namespace Project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogCarouselController : ControllerBase
    {
        private readonly IBlogCarouselBO _blogCarouselBO;

        public BlogCarouselController(IBlogCarouselBO blogCarouselBO)
        {
            _blogCarouselBO = blogCarouselBO;
        }

        [HttpGet("GetBlogs")]
        public async Task<List<Blog>> GetBlogs()
        {
            List<Blog> blogList = await _blogCarouselBO.GetBlogsAsync();
            return blogList;
        }

        [HttpPost("CreateBlog")]
        public async Task<ActionResult<Blog>> CreateBlog( Blog blog)
        {
            bool complateOk = await _blogCarouselBO.CreateBlogAsync(blog);

            return Ok(complateOk);
        }

        [HttpPut("EditBlog")]
        public async Task<ActionResult<Blog>> EditBlog(Blog blog)
        {
            bool complateOk = await _blogCarouselBO.EditBlog(blog);

            return Ok(complateOk);
        }

        [HttpDelete("DeleteBlog")]
        public async Task<ActionResult<Blog>> DeleteBlog(int id)
        {
            bool complateOk = await _blogCarouselBO.DeleteBlog(id);

            return Ok(complateOk);
        }


    }
}
