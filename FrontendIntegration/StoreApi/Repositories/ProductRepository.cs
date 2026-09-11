using Microsoft.EntityFrameworkCore;
using Store.Data;
using Store.Models;

namespace Store.Repositories;

public class ProductRepository : IProductRepostiory
{
    private readonly ProductDbContext _db;
    private readonly ILogger<ProductRepository> _logger;

    public ProductRepository(ProductDbContext db, ILogger<ProductRepository> logger)
    {
        _db = db;
        _logger = logger;
    }

    public async Task<Product> CreateAsync(Product product, CancellationToken cancellationToken = default)
    {
        await _db.Products.AddAsync(product, cancellationToken);
        _logger.LogInformation("Product is added. Id: {id} Name: {name}"
            , product.Id
            , product.Name);
        await _db.SaveChangesAsync(cancellationToken);
        return product;
    }

    public async Task DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var product = await _db.Products.FindAsync(id, cancellationToken);
        if (product is null)
        {
            _logger.LogWarning("Product is not found for delete");
            return;
        }
        _db.Products.Remove(product);
        _logger.LogInformation("Product is removed");
        await _db.SaveChangesAsync(cancellationToken);
    }

    public async Task<IEnumerable<Product>> GetAllProductAsync(CancellationToken cancellationToken = default) => await _db.Products
        .AsNoTracking()
        .Include(product => product.Category)
        .OrderBy(product => product.Id)
        .ThenBy(product => product.Name)
        .ToListAsync(cancellationToken);

    public Task<Product?> GetByIdAsync(int id, CancellationToken cancellationToken = default) => _db.Products
        .AsNoTracking()
        .Include(product => product.Category)
        .FirstOrDefaultAsync(product => product.Id == id, cancellationToken);

    public async Task<IEnumerable<Category>> GetCategoriesAsync(CancellationToken cancellationToken = default) => await _db.Categories
        .AsNoTracking()
        .OrderBy(category => category.Id)
        .ThenBy(category => category.CategoryName)
        .ToListAsync(cancellationToken);

    public async Task UpdateAsync(Product product, CancellationToken cancellationToken = default)
    {
        var existing = await _db.Products.FindAsync(product.Id, cancellationToken);
        if (existing is null)
        {
            _logger.LogWarning("Product update is failed");
            return;
        }
        
        existing.Name = product.Name;
        existing.Description = product.Description;
        existing.CategoryId = product.CategoryId;
        existing.Price = product.Price;

        _logger.LogInformation("Product is updated. Id: {id} Name: {name}"
            , existing.Id
            , existing.Name);
        await _db.SaveChangesAsync(cancellationToken);
    }
}
