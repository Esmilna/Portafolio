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

        public DbSet<SaleDetails> SalesDetails { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<Client> Clients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SaleDetails>().ToTable("SaleDetails");
            modelBuilder.Entity<Sale>().ToTable("Sale")
                .HasMany(s => s.SalesDetails)
                .WithOne(sd => sd.Sale)
                .HasForeignKey(sd => sd.SaleID)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<Brand>().ToTable("Brand")
                .HasMany(b => b.Models)
                .WithOne(m => m.Brand)
                .HasForeignKey(m => m.BrandID)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Model>().ToTable("Model")
                .HasMany(m => m.Cars)
                .WithOne(c => c.Model)
                .HasForeignKey(c => c.ModelID)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Car>().ToTable("Car")
                .HasMany(c => c.SaleDetails)
                .WithOne(sd => sd.Car)
                .HasForeignKey(sd => sd.CarID)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Client>().ToTable("Client")
                .HasMany(c => c.Sales)
                .WithOne(s => s.Client)
                .HasForeignKey(s => s.ClientID)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
