using Microsoft.EntityFrameworkCore;
using TestApi.Models;

namespace TestApi9A
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
         public DbSet<Comment>? Comments { get; set; } //Mapear modelo con la tabla de la base de datos

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Comment>().HasData(
                new Comment()
                {
                    Id = 1,
                    Title = "Test",
                    Description="Tkhaskhkhsk",
                    Author = "Javier Garduño",
                    CreatedAt = new DateTime()
                },
                new Comment()
                {
                    Id = 2,
                    Title = "Test",
                    Description="Testsss",
                    Author = "María Rojo",
                    CreatedAt = new DateTime()
                }
            );
        }

    }
}