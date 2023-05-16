import { Component, OnInit, Inject, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { DialogComponent } from '../dialog/dialog.component';
import { ViewChild, ElementRef } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Product } from 'src/app/models/producto.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit{
  
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 2', cols: 1, rows: 1 },
        ];
      }
      return [
        { title: 'Card 2', cols: 1, rows: 1 },
      ];
    })
  );

  products: Product[] = [];

  constructor(private breakpointObserver: BreakpointObserver, private http: HttpClient, private dialog: MatDialog ) {}

  ngOnInit () {
    this.loadProducts();
  }

  loadProducts() {
    const url_api = 'https://fakestoreapi.com/products';
    this.http.get<Product[]>(url_api).subscribe((data) => {
      this.products = data;
    });
  }

  deleteProduct(product: Product) {
    const url_api = `https://fakestoreapi.com/products/${product.id}`;
    this.http.delete(url_api).subscribe(() => {
      // Eliminar el producto del array de productos
      const index = this.products.findIndex(p => p.id === product.id);
      if (index !== -1) {
        this.products.splice(index, 1);
      }
      const dialogRef = this.dialog.open(DialogComponent, {
        data: { title: 'Product delete successfully' }
      });
    });
  }

  openConfirmDialog(product: Product) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: `Are you sure you want to delete this product whit ID ${product.id} ?`
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si el resultado es verdadero, realizar la acción de eliminación
        this.deleteProduct(product);
      }
    });
  }

  selectedProduct: Product | undefined;

  //METODO PARA ACTUALIZAR LAS CARDS DE LOS PRODUCTOS
  updateProduct(product: Product) {
    const url_api = 'https://fakestoreapi.com/products/' + product.id;
    // Realizar la petición PUT a tu API con los datos actualizados
    this.http.put<Product>(url_api, product).subscribe(
      (updatedProduct) => {
        // La actualización se realizó con éxito
        const dialogRef = this.dialog.open(DialogComponent, {
          data: { title: 'Product updated successfully' }
        });
        console.log('Product updated successfully:', updatedProduct);
        // Actualizar el producto en el array de productos
        const index = this.products.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }
      },
      (error) => {
        // Ocurrió un error durante la actualización
        const dialogRef = this.dialog.open(DialogComponent, {
          data: { title: 'Error updating product' }
        });
        console.error('Error updating product:', error);
      }
    );
  }
  openUpdateDialog(product: Product): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '300px',
      data: { product }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Realizar la acción de actualización
        console.log('Product updated:', result.product);
        this.updateProduct(result.product);
      }
    });
  }

  @Input() product: Product = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: ''
  };

  addNewProduct(product: Product) {
    // Agregar el nuevo producto a la lista existente
    this.products.push(product);
    // Mostrar un mensaje de éxito
    alert('Product added successfully');
    // agegar a las lista de productos
    const url_api = 'https://fakestoreapi.com/products';
    this.http.post<Product>(url_api, product).subscribe(
      (newProduct) => {
        // La actualización se realizó con éxito
        alert('Product added successfully');
        console.log('Product added successfully:', newProduct);
        // Actualizar el producto en el array de productos
        const index = this.products.findIndex(p => p.id === newProduct.id);
        if (index !== -1) {
          this.products[index] = newProduct;
        }
      }
    );
  }
  
}
