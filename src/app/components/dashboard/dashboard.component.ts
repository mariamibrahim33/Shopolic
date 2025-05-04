import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { DashboardService, Product } from '../../services/dashboard.service'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private dashboardService: DashboardService) {}

  sidebarOpen = false;
  products: Product[] = [];

  product: Product = {
    name: '',
    price: 0,
    description: '',
    image: ''
  };
  selectedFile: File | null = null;
  isEditing: boolean = false;
  editingProductId: string | null = null;

  ngOnInit(): void {
    this.fetchProducts();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.menu-toggle');

    if (this.sidebarOpen && sidebar && menuToggle) {
      if (!sidebar.contains(target) && !menuToggle.contains(target)) {
        this.sidebarOpen = false;
      }
    }
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  fetchProducts() {
    this.dashboardService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Failed to fetch products', err)
    });
  }

  submitProduct() {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('price', this.product.price.toString());
    formData.append('description', this.product.description);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.isEditing && this.editingProductId) {
      this.dashboardService.updateProduct(this.editingProductId, formData).subscribe({
        next: () => {
          alert('Product updated successfully!');
          this.resetForm();
          this.fetchProducts();
        },
        error: (err) => {
          console.error('Update failed', err);
          alert('Failed to update product.');
        }
      });
    } else {
      this.dashboardService.addProduct(formData).subscribe({
        next: () => {
          alert('Product added successfully!');
          this.resetForm();
          this.fetchProducts();
        },
        error: (err) => {
          console.error('Add failed', err);
          alert('Failed to add product.');
        }
      });
    }
  }

  editProduct(product: Product) {
    this.product = {
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image
    };
    this.editingProductId = product._id ?? null;
    this.isEditing = true;
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.dashboardService.deleteProduct(id).subscribe({
        next: () => {
          alert('Product deleted.');
          this.fetchProducts();
        },
        error: (err) => {
          console.error('Delete failed', err);
          alert('Failed to delete product.');
        }
      });
    }
  }

  resetForm() {
    this.product = { name: '', price: 0, description: '', image: '' };
    this.selectedFile = null;
    this.isEditing = false;
    this.editingProductId = null;
  }
}
