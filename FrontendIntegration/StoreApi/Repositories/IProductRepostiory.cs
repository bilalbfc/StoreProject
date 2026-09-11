using Store.Models;

namespace Store.Repositories;

public interface IProductRepostiory
{
    public Task<IEnumerable<Product>> GetAllProductAsync(CancellationToken cancellationToken=default);
    public Task<Product> CreateAsync(Product product, CancellationToken cancellationToken=default);
    public Task UpdateAsync(Product product, CancellationToken cancellationToken=default);
    public Task<Product?> GetByIdAsync(int id, CancellationToken cancellationToken=default);
    public Task DeleteAsync(int id, CancellationToken cancellationToken=default);
    public Task<IEnumerable<Category>> GetCategoriesAsync(CancellationToken cancellationToken=default);
}
