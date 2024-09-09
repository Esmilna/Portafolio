using DB.Data.Entities;
using Microsoft.EntityFrameworkCore;
using SistemaDeInventarioDeVentaDeVehiculos.Data.Entities;
using BC = BCrypt.Net.BCrypt;

namespace SistemaDeInventarioDeVentaDeVehiculos.Data.Context
{
    public class CarDbContext : DbContext
    {
        public CarDbContext(DbContextOptions<CarDbContext> options)
            : base(options)
        {

        }

        private static string HashPassword(string password)
        {
            return BC.HashPassword(password);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<Car> Cars { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        { 


            modelBuilder.Entity<User>()
                .ToTable("User")
                .Property(p => p.Password)
                .HasConversion(
                    hash => HashPassword(hash), 
                    hash => hash
                );
            modelBuilder.Entity<Brand>().ToTable("Brand");
            modelBuilder.Entity<Model>().ToTable("Model");
            modelBuilder.Entity<Car>().ToTable("Car");

        }
    }
}
