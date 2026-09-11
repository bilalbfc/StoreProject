using Microsoft.EntityFrameworkCore;
using Store.Models;

namespace Store.Data;

public class ProductDbContext(DbContextOptions<ProductDbContext> options) : DbContext(options)
{
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(Product).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}
