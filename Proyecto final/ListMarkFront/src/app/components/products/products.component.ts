import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductList } from '../../Models/ProductList';
import { Product } from '../../Models/Product';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers:[ProductService]
})
export class ProductsComponent implements OnInit{
  products: any;
  listId!: number;
  productToDelete?: number;
  productSelected: number = 0;
  productModel: Product = {
    id: 1,
    name: '',
    description: '',
    image: '',
    brandId: 1,
    categoryId: 1
  };
  constructor(private productService: ProductService)
  {

  }
  ngOnInit(): void {
    this.loadProducts();
  }
  
  loadProducts()

  {
    this.productService.getProducts().subscribe({
      next: (producto) => {
        this.products = producto
        console.log("Productos listados para dropdown",this.products )
      },

    });
  }

  
  addProduct(): void {
    console.log("Añadiendo producto");
    this.productModel.brandId = 1;
    this.productModel.categoryId = 1;

    if (this.productModel.name && this.productModel.description && this.productModel.brandId && this.productModel.categoryId) {
      this.productService.createProduct(this.productModel).subscribe({
        next: (product) => {
          console.log("Producto añadido con éxito:", product);
          window.location.reload();
          // Aquí puedes añadir lógica adicional después de crear el producto, como cerrar un modal si tienes uno.
        },
        
        error: (error) => console.error('Error al añadir el producto', error)
      });
    } else {
      console.log("Faltan datos para crear el producto.");
    }
  }

  selectProductForEdit(product: Product): void {
    this.productModel = {...product}; // Clonar el producto para evitar mutaciones directas
  }

  updateProduct(): void {

    if (this.productModel.id == null) {
      console.error('Error: el producto no tiene un ID válido.');
      return; // Salir del método si no hay un ID válido
    }
    console.log("Modelo del producto",this.productModel)
  
    this.productService.updateProduct(this.productModel.id, this.productModel).subscribe({
      next: (response) => {
        console.log('Product updated successfully:', response);
        window.location.reload(); // Recargar la página o actualizar la lista de productos para reflejar los cambios
      },
      error: (error) => console.error('Error updating the product:', error)
    });
  }

  
  deleteProduct(productId: number): void {
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar este producto?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(productId).subscribe({
          next: () => {
            Swal.fire({
              title: 'Eliminado',
              text: 'El producto se eliminó correctamente.',
              icon: 'success'
            });
            this.products = this.products.filter((product: { id: number; }) => product.id !== productId);
          },
          error: (error) => {
            console.error('Error deleting the product:', error);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al eliminar el producto.',
              icon: 'error'
            });
          }
        });
      }
    });
  } 

}
