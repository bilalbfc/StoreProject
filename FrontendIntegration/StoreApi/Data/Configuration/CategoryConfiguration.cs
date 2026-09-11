using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Models;

namespace Store.Data.Configuration;

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.ToTable("Category");

        builder.HasKey(c => c.Id);

        builder.Property(c => c.CategoryName)
            .IsRequired();
        builder.HasIndex(c => c.CategoryName)
            .IsUnique();

        builder.HasIndex(c => c.Id);

        builder.HasData(
            new Category { Id = 1, CategoryName = "İç Giyim" },
            new Category { Id = 2, CategoryName = "Dış Giyim" },
            new Category { Id = 3, CategoryName = "Kışlık" },
            new Category { Id = 4, CategoryName = "Spor" },
            new Category { Id = 5, CategoryName = "Şapka" },
            new Category { Id = 6, CategoryName = "Ayakkabı" },
            new Category { Id = 7, CategoryName = "Terlik" }
        );
    }
}
