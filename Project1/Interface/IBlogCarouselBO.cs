using Project1.Entitys;

namespace Project1.Interface
{
    public interface IBlogCarouselBO
    {
        Task<List<Blog>> GetBlogsAsync();

        Task<bool> CreateBlogAsync(Blog blog);

        Task<bool> EditBlog(Blog blog);
        Task<bool> DeleteBlog(int id);
    }
}
