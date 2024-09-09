import { Component } from '@angular/core';
import { List } from '../../Models/List';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../../services/list.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductListService } from '../../services/product-list.service';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../Models/Product';
import { FormsModule } from '@angular/forms';
import { ProductList } from '../../Models/ProductList';

@Component({
  selector: 'app-list-detail',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './list-detail.component.html',
  styleUrl: './list-detail.component.css',
  providers:[ListService, ProductListService, ProductService]
})
export class ListDetailComponent {

  listId!: number; // O el tipo adecuado para tu ID
  listDetails!: List;
  ProductListDetails: any;
  enrichedProductListDetails: any[] = [];
  ProductList : any [] = [];
  products: any;

 

    productModel: Product = {
    name: '',
    description: '',
    image: '',
    brandId: 1,
    categoryId: 1
  };
  productSelected: number = 0;
  productListModel: ProductList = {
    listNumberId: this.listId,
    productNumberId: this.productSelected
  }
  
  constructor(
    private route: ActivatedRoute,
    private listService: ListService,
    private productListService: ProductListService,
    private productService: ProductService
     // Suponiendo que tu servicio tiene un método para obtener los detalles por ID
  ) {}

  ngOnInit(): void {
    this.listId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadListDetails();
    this.loadProductListDetails();
    this.loadProducts();
  }

  loadListDetails(): void {
    this.listService.getListById(this.listId).subscribe({
      next: (list) => {
        this.listDetails = list;
        console.log("Detalles de lista", this.listDetails)
      },
      error: (err) => {
        console.error('Error cargando los detalles de la lista', err);
      }
    });
  }
  loadProductListDetails(): void {
    this.productListService.getProductLists().subscribe({
      next: (productList) => {
        // Filtrar los elementos cuyo listNumberId coincida con listId
        console.log("ProductList", productList)
        this.ProductListDetails = productList.filter(product => product.listNumberId == this.listId);
        //var enrich = this.enrichProductListDetails();
        //console.log("enrich", enrich)
        this.getProduct( this.ProductListDetails);

        console.log("Id de la lista",this.listId);
        console.log("lista de productos filtrada", this.ProductListDetails);
      },
      error: (error) => console.error('Error al cargar las listas:', error)
    });
  }



  enrichProductListDetails(): void {
  
  }

  getProduct(productListId : any)
  {
    console.log("Nombre producto")
    this.ProductListDetails.forEach((detail: any) =>{
      this.productService.getProductById(detail.productNumberId).subscribe(product =>{
        //const productName = product.name;
        this.ProductList.push(product.name)
        //console.log("Nombre producto", productName)
      });
    })
    console.log("Nombre producto", this.ProductList)
    
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

  loadProducts()
  {
    this.productService.getProducts().subscribe({
      next: (producto) => {
        this.products = producto
        console.log("Productos listados para dropdown",this.products )
      },

    });
  }

  AddProductToList()
  {
    if (this.listId != null && this.productSelected != null) {
      // Actualiza productListModel con los valores actuales
      this.productListModel = {
        listNumberId: this.listId,
        productNumberId: this.productSelected,
      }}
      window.location.reload();
    console.log("Lista de producto para pruebas", this.productListModel)
    this.productListService.createProductList(this.productListModel).subscribe({
      next: (productList) =>{
      }
    })
  }
  
  
}