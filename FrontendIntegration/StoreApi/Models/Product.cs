using System.Text.Json.Serialization;

namespace Store.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int CategoryId { get; set; }
    public int Price { get; set; }
    public Category? Category { get; set; }
}
