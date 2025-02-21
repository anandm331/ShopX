export const PRODUCT_FORM_CONFIG = {
    formTitle: 'Add New Product',
    fields: [
      {
        name: 'productName',
        type: 'text',
        label: 'Product Name',
        validators: ['required', 'productNameValidator']
      },
      {
        name: 'price',
        type: 'number',
        label: 'Price',
        validators: ['required', 'min:1']
      },
      {
        name: 'category',
        type: 'select',
        label: 'Category',
        options: ['Electronics', 'Fashion', 'Home & Kitchen', 'Books'],
        validators: ['required', 'categoryValidator']
      },
      {
        name: 'inStock',
        type: 'checkbox',
        label: 'In Stock'
      },
      {
        name: 'stockQuantity',
        type: 'number',
        label: 'Stock Quantity',
        validators: ['required', 'stockValidator']
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Product Description'
      },
    ]
  };
  