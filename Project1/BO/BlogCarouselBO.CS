using Project1.Entitys;
using Project1.Interface;
using System.Reflection.Metadata;
using System.Text.Json;

namespace Project1.BO
{
    public class BlogCarouselBO : IBlogCarouselBO
    {
        public async Task<List<Blog>> GetBlogsAsync()
        {
            List<Blog> blogs = new();

            try
            {
                var filePath = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "Data",
                    "blogs.json"
                );

                if (File.Exists(filePath))
                {
                    var json = await File.ReadAllTextAsync(filePath);

                    blogs = JsonSerializer.Deserialize<List<Blog>>(json, new JsonSerializerOptions
                        {
                            PropertyNameCaseInsensitive = true
                        })
                        ?? new List<Blog>();
                }
            }
            catch (Exception ex)
            {
                // logger
            }

            return blogs;
        }

        public async Task<bool> CreateBlogAsync(Blog blog)
        {
            bool isCompleateOk = true;

            try
            {
                List<Blog> exsistBlogs = await GetBlogsAsync();
                blog.Id = exsistBlogs.Max(x => x.Id) + 1;
                exsistBlogs.Add(blog);

                WriteToFile(exsistBlogs);
            }
            catch (Exception ex)
            {
                isCompleateOk = false;
            }
            
            return isCompleateOk;

        }

        public async Task<bool> EditBlog(Blog blog)
        {
            bool isCompleateOk = true;
            try
            {
                List<Blog> exsistBlogs = await GetBlogsAsync();
                Blog? blogToEditBlog = exsistBlogs.FirstOrDefault(x => x.Id == blog.Id);
                if (blogToEditBlog != null)
                {
                    blogToEditBlog.Title = blog.Title;
                    blogToEditBlog.Author = blog.Author;
                    blogToEditBlog.ImageUrl = blog.ImageUrl;
                    blogToEditBlog.Body = blog.Body;


                    WriteToFile(exsistBlogs);
                }
            }
            catch (Exception ex)
            {
                isCompleateOk = false;
            }

            return isCompleateOk;
        }

        public async Task<bool> DeleteBlog(int id)
        {
            bool isCompleateOk = true;
            try
            {
                List<Blog> exsistBlogs = await GetBlogsAsync();
                Blog? blogToRemove = exsistBlogs.FirstOrDefault(x => x.Id == id);
                if (blogToRemove != null)
                {
                    exsistBlogs.Remove(blogToRemove);
                    WriteToFile(exsistBlogs);
                }
            }
            catch (Exception ex)
            {
                isCompleateOk = false;
            }

            return isCompleateOk;
        }

        private async Task WriteToFile(List<Blog> blogs)
        {
            string filePath = Path.Combine(
                        Directory.GetCurrentDirectory(),
                        "Data",
                        "blogs.json"
                    );

            string json = JsonSerializer.Serialize(
                blogs,
                new JsonSerializerOptions
                {
                    WriteIndented = true
                });

            await File.WriteAllTextAsync(filePath, json);
        }

       
    }
}
