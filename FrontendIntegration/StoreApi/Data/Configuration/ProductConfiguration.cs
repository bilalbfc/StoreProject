using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Models;

namespace Store.Data.Configuration;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("Products");

        builder.HasKey(product => product.Id);

        builder.Property(product => product.Price)
            .HasColumnType("decimal(18,2)");

        builder.Property(product => product.Name)
            .HasMaxLength(150)
            .IsRequired();

        builder.Property(product => product.Description)
            .HasMaxLength(700);

        builder.HasOne(product => product.Category)
            .WithMany(category => category.Products)
            .HasForeignKey(product => product.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(product => product.Id);
        builder.HasIndex(product => product.Name);

        builder.HasData(
    new Product
    {
        Id = 1,
        Name = "Pantolon",
        Description = "Mavi Jeans",
        Price = 1200,
        CategoryId = 2
    },
    new Product
    {
        Id = 2,
        Name = "Gömlek",
        Description = "Mavi Düğmeli",
        Price = 1000,
        CategoryId = 2
    },
    new Product
    {
        Id = 3,
        Name = "Bere",
        Description = "Kırmızı, Tüylü",
        Price = 200,
        CategoryId = 5
    },
    new Product
    {
        Id = 4,
        Name = "Atlet",
        Description = "Beyaz",
        Price = 50,
        CategoryId = 1
    },
    new Product
    {
        Id = 5,
        Name = "Boxer",
        Description = "Siyah",
        Price = 40,
        CategoryId = 1
    },
    new Product
    {
        Id = 6,
        Name = "Mont",
        Description = "Siyah, Kaz Tüylü",
        Price = 1700,
        CategoryId = 3
    },
    new Product
    {
        Id = 7,
        Name = "Sandalet",
        Description = "Mavi, Tuvalet Terliği",
        Price = 25,
        CategoryId = 7
    },
    new Product
    {
        Id = 8,
        Name = "Spor Bandı",
        Description = "Siyah, Lastikli",
        Price = 220,
        CategoryId = 4
    }
);
    }
}
