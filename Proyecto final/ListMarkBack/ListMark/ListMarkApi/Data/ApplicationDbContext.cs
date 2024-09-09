using Microsoft.EntityFrameworkCore;
using ListMarkApi;
using ListMarkApi.Models;

namespace ListMarkApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
            : base(options) { }

        public DbSet<Product> Product { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Details> Details { get; set; }
        public DbSet<Stock> Stock { get; set; }
        public DbSet<Brand> Brand { get; set; }
        public DbSet<Log> Log { get; set; }
        public DbSet<Permission> Permission { get; set; }
        public DbSet<Supermarket> Supermarket { get; set; }
        public DbSet<Commonfields> Commonfields { get; set; }
        public DbSet<List> List { get; set; }
        public DbSet<ListDetails> ListDetails { get; set; }
        public DbSet<ProductList> ProductList { get; set; }


        /*protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().ToTable("Product");
            modelBuilder.Entity<Category>().ToTable("Category");
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<Stock>().ToTable("Stock");
            modelBuilder.Entity<Brand>().ToTable("Brand");
            modelBuilder.Entity<Log>().ToTable("Log");
            modelBuilder.Entity<Permission>().ToTable("Permission");
            modelBuilder.Entity<Supermarket>().ToTable("Supermarket");

        }*/
    }
}
