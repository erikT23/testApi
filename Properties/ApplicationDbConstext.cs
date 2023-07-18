using Microsoft.EntityFrameworkCore;

namespace TestApi9A
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options){

        }
    }
}