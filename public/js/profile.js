const newFormHandler = async (event) => {
    event.preventDefault();
  
    const productName = document.querySelector('#product-name').value.trim();
    const productPrice = document.querySelector('#product-price').value.trim();
    const description = document.querySelector('#product-desc').value.trim();
    const image  = document.querySelector('#product-image').value.trim();

    if (productName && productPrice && description && image) {
      const response = await fetch(`/api/products`, {
        method: 'POST',
        body: JSON.stringify({ productName, productPrice, description, image }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create product');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete this product');
      }
    }
  };
  
  document
    .querySelector('.new-jewellery-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.jewellery-list')
    .addEventListener('click', delButtonHandler);
  