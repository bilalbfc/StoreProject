using Microsoft.AspNetCore.Mvc;
using Store.Models;
using Store.Repositories;

namespace Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepostiory _repo;

        public ProductsController(IProductRepostiory repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetAllProductsAsync(CancellationToken cancellationToken)
        {
            var products = await _repo.GetAllProductAsync(cancellationToken);
            return Ok(products);
        }

        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<Category>>> GetAllCategoriesAsync(CancellationToken cancellationToken)
        {
            var categories = await _repo.GetCategoriesAsync(cancellationToken);
            return Ok(categories);
        }

        [HttpGet("{id:int}", Name = "GetProductById")]
        public async Task<ActionResult<Product>> GetProductByIdAsync([FromRoute] int id, CancellationToken cancellationToken)
        {
            var product = await _repo.GetByIdAsync(id, cancellationToken);
            if (product is null)
                return NotFound();
            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProductAsync([FromBody] Product product, CancellationToken cancellationToken)
        {
            var tempProduct = await _repo.CreateAsync(product, cancellationToken);
            if (tempProduct is null)
                return BadRequest("Product create is failed");
            return CreatedAtRoute("GetProductById", new {id = tempProduct.Id}, tempProduct);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteProductAsync([FromRoute] int id, CancellationToken cancellationToken)
        {
            var existing = await _repo.GetByIdAsync(id, cancellationToken);
            if (existing is null)
                return NotFound();
            await _repo.DeleteAsync(id, cancellationToken);
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<Product>> UpdateProductAsync([FromBody] Product product,
            [FromRoute] int id,
            CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
                return ValidationProblem();
            if (id != product.Id)
                return BadRequest();

            var existing = await _repo.GetByIdAsync(id, cancellationToken);
            if (existing is null)
                return NotFound();

            await _repo.UpdateAsync(product, cancellationToken);
            return NoContent();
        }
    }
}
