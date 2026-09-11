const API_URL = "http://localhost:5288";

// API functions for interacting with the backend API
async function getAllProducts() {
    const response = await fetch(`${API_URL}/api/Products`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products = await response.json();
    return products;
}

async function getAllCategories() {
    const response = await fetch(`${API_URL}/api/Products/categories`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const categories = await response.json();
    return categories;
}

async function getProductById(productId) {
    const response = await fetch(`${API_URL}/api/Products/${productId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const product = await response.json();
    return product;
}

async function createProduct(productData) {
    const response = await fetch(`${API_URL}/api/Products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    });

    const responseText = await response.text();

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const createdProduct = await response.json();
    return createdProduct;
}

async function deleteProduct(productId) {
    const response = await fetch(`${API_URL}/api/Products/${productId}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.status === 204) {
        return;
    }

    return response.json();
}

async function updateProduct(productId, productData) {
    const response = await fetch(`${API_URL}/api/Products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}

// Function to search products
function searchProducts(products, productName, productCategory, ascPrice) {
    if (productName) {
        products = products.filter(product =>
            product.name.toLowerCase().includes(productName.toLowerCase())
        );
    }
    if (productCategory) {
        products = products.filter(product =>
            product.category.categoryName.toLowerCase().includes(productCategory.toLowerCase())
        );
    }
    products = products.sort((productA, productB) => {
        if (ascPrice) {
            return productA.price - productB.price;
        } else {
            return productB.price - productA.price;
        }
    });
    return products;
}

async function search() {
    products = await getAllProducts();
    productName = document.getElementById('search-input').value;
    productCategory = document.getElementById('category-filter').value;
    ascPrice = document.getElementById('sort-price').value === 'asc';

    products = searchProducts(products, productName, productCategory, ascPrice);
    displayProducts(products);
    return products;
}

function getCategoriesForSearch() { 
    getAllCategories().then(categories => {
        const categorySelect = document.getElementById('category-filter');
        categorySelect.innerHTML = '<option value="">Tüm Kategoriler</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.categoryName;
            option.textContent = category.categoryName;
            categorySelect.appendChild(option);
        });
    });
}

// Functions to display data in the UI
function displayProducts(products) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <h3>Ad: ${product.name}</h3>
            <p>Kategori: ${product.category.categoryName}</p>
            <p>Fiyat: $${product.price.toFixed(2)}</p>
            <button class="view-product" data-id="${product.id}">Detay</button>
            <button class="update-product" data-id="${product.id}">Güncelle</button>
            <button class="delete-product" data-id="${product.id}">Sil</button>
        `;
        productsContainer.appendChild(productElement);
    });
}

function productCreatePage() {
    const productCreateContainer = document.getElementById('product-create-container');
    productCreateContainer.innerHTML = `
        <h3>Create New Product</h3>
        <form id="create-product-form">
            <label for="product-name">Name:</label>
            <input type="text" id="product-name" required>

            <label for="product-description">Description:</label>
            <textarea id="product-description" required></textarea>

            <label for="product-price">Price:</label>
            <input type="number" id="product-price" step="0.01" required>

            <label for="product-category">Category:</label>
            <select id="product-category" required>
            </select>
            
            <a class="back-button" href="index.html">
                <button type="button">Geri</button>
            </a>
            <button type="submit">Ürün Oluştur</button>
        </form>
    `;

    const categorySelect = document.getElementById('product-category');

    getAllCategories().then(categories => {
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.categoryName;
            categorySelect.appendChild(option);
        });
    });
}

function productDetailsPage(product) {
    const productDetailsContainer = document.getElementById('product-details-container');
    productDetailsContainer.innerHTML = `
        <h3>Ad: ${product.name}</h3>
        <p>Açıklama: ${product.description}</p>
        <p>Fiyat: $${product.price.toFixed(2)}</p>
        <p>Kategori: ${product.category.categoryName}</p>
    `;
}

async function loadProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    const product = await getProductById(productId);
    productDetailsPage(product);
}

async function productUpdatePage(product) {
    const productUpdateContainer = document.getElementById('product-update-container');

    productUpdateContainer.innerHTML = `
        <h3>Update Product: ${product.name}</h3>

        <form id="update-product-form">
            <input type="hidden" id="product-id" value="${product.id}">

            <label for="product-name">Name:</label>
            <input type="text" id="product-name" value="${product.name}" required>

            <label for="product-description">Description:</label>
            <textarea id="product-description">${product.description}</textarea>

            <label for="product-price">Price:</label>
            <input type="number" id="product-price" value="${product.price}" step="0.01" required>

            <label for="product-category">Category:</label>
            <select id="product-category" required>
            </select>

            <a class="back-button" href="index.html">
                <button type="button">Geri</button>
            </a>

            <button type="submit">Update Product</button>
        </form>
    `;

    const categorySelect = document.getElementById('product-category');

    const categories = await getAllCategories();

    categories.forEach(category => {
        const option = document.createElement('option');

        option.value = category.id;
        option.textContent = category.categoryName;

        if (category.categoryName === product.category.categoryName) {
            option.selected = true;
        }

        categorySelect.appendChild(option);
    });
}

async function loadProductForUpdate() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    const product = await getProductById(productId);
    await productUpdatePage(product);
}

// Functions to display messages in the UI
function displayProductDeleteMessage(productId) {
    const productDeleteMessageContainer = document.getElementById('product-delete-message-container');
    productDeleteMessageContainer.innerHTML = `
        <p>Product with ID ${productId} has been deleted successfully.</p>
    `;
}

function displayProductUpdateMessage(productId) {
    const productUpdateMessageContainer = document.getElementById('product-update-message-container');
    productUpdateMessageContainer.innerHTML = `
        <p>Product with ID ${productId} has been updated successfully.</p>
    `;
}

function displayProductCreateMessage(productId) {
    const productCreateMessageContainer = document.getElementById('product-create-message-container');
    productCreateMessageContainer.innerHTML = `
        <p>Product with ID ${productId} has been created successfully.</p>
    `;
}

function goBack() {
    window.location.href = "index.html";
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('index.html')) {
        getCategoriesForSearch();
        search();
    }
});

document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('view-product')) {

        const productId = event.target.getAttribute('data-id');

        window.location.href = `details.html?id=${productId}`;
    }
});

document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('update-product')) {
        const productId = event.target.getAttribute('data-id');
        window.location.href = `update.html?id=${productId}`;
    }
});

document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-product')) {
        const productId = event.target.getAttribute('data-id');
        try {
            await deleteProduct(productId);
            displayProductDeleteMessage(productId);
            search();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }
});

document.addEventListener('submit', async (event) => {
    if (event.target.id === 'update-product-form') {
        event.preventDefault();
        const productId = document.getElementById('product-id').value;
        const productName = document.getElementById('product-name').value;
        const productDescription = document.getElementById('product-description').value;
        const productPrice = parseFloat(document.getElementById('product-price').value);
        const productCategory = document.getElementById('product-category').value;

        const productData = {
            id: productId,
            name: productName,
            description: productDescription,
            price: productPrice,
            categoryId: parseInt(productCategory)
        };

        try {

            await updateProduct(productId, productData);
            window.location.href = "index.html";
        } catch (error) {
            console.error('Error updating product:', error);
        }
    }
});

document.addEventListener('submit', async (event) => {
    if (event.target.id ==='create-product-form') {
        event.preventDefault();
        const productName = document.getElementById('product-name').value;
        const productDescription = document.getElementById('product-description').value;
        const productPrice = parseFloat(document.getElementById('product-price').value);
        const productCategory = document.getElementById('product-category').value;
        
        const productData = {
            name: productName,
            description: productDescription,
            price: productPrice,
            categoryId: parseInt(productCategory)
        };

        try {
            const createdProduct = await createProduct(productData);
            displayProductCreateMessage(createdProduct.id);
            window.location.href = "index.html";
        } catch (error) {
            console.error('Error creating product:', error);
        }
    }
});

if (window.location.pathname.includes('details.html')) {
    loadProductDetails();
}

if (window.location.pathname.includes('create.html')) {
    productCreatePage();
}

if (window.location.pathname.includes('update.html')) {
    loadProductForUpdate();
}