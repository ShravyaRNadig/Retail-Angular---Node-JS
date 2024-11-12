import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    image: ''
  };

  selectedProduct: Product | null = null;  // This will store the product being viewed

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  // Method to fetch products from the backend
  loadProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  // Method to add a new product
  addProduct(): void {
    if (this.newProduct.name && this.newProduct.price > 0) {
      this.productService.addProduct(this.newProduct).subscribe((product: Product) => {
        this.products.push(product);  // Add the new product to the list
        this.resetNewProductForm();
      });
    } else {
      alert("Product name and price are required!");
    }
  }

  // Method to reset the form after adding a product
  resetNewProductForm(): void {
    this.newProduct = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      stock: 0,
      image: ''
    };
  }

  // Method to select and display the product details
  viewProductDetails(product: Product): void {
    this.selectedProduct = product;
  }

  // Method to close the product details modal
  closeProductDetails(): void {
    this.selectedProduct = null;
  }
}
