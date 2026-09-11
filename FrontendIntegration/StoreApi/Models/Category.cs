using Microsoft.VisualBasic;
using System.Text.Json.Serialization;

namespace Store.Models;

public class Category
{
    public int Id { get; set; }
    public string CategoryName { get; set; } = string.Empty;

    [JsonIgnore]
    public ICollection<Product> Products { get; set; } = [];
}