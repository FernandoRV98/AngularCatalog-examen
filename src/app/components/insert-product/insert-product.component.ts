import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

import { Product } from 'src/app/models/producto.model';
import { DialogRef } from '@angular/cdk/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-insert-product',
  templateUrl: './insert-product.component.html',
  styleUrls: ['./insert-product.component.css']
})
export class InsertProductComponent {

  product: any = {}; // Puedes definir una interfaz o modelo específico para el producto
  productForm: FormGroup;
  initilaFormValues: any = {};
  

  constructor(private http: HttpClient, private location: Location, private formBuilder: FormBuilder, private dialog: MatDialog) {
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required]
    });

    this.initilaFormValues = this.productForm.value;
    
  }

  @Output() productSaved: EventEmitter<Product> = new EventEmitter<Product>();

  saveProduct() {
    const url_api = 'https://fakestoreapi.com/products/'
    // Realizar la lógica para guardar el producto en el dashboard
    this.http.post<any>(url_api, this.product).subscribe(
      (response) => {
        // Producto guardado exitosamente
        console.log('Product saved successfully:', response);
        // Restablecer los campos del formulario
        this.product = {};

        const dialogRef = this.dialog.open(DialogComponent, {
          width: '250px',
          data: { title: 'Product saved successfully' }

        });

        //console.log(response.product);
        //recargar el dashboard
        //this.location.back();

        this.clearForm();

        this.productSaved.emit(response.product);
        
      },
      (error) => {
        // Ocurrió un error al guardar el producto
        console.error('Error saving product:', error);
        alert('Error saving product');
      }
    );
  }

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append('image', file);

      // Realizar la lógica para cargar la imagen en el servidor
      this.http.post<any>('URL_DEL_ENDPOINT', formData).subscribe(
        (response) => {
          // La imagen se cargó correctamente en el servidor
          alert('Image uploaded successfully');
          console.log('Image uploaded successfully:', response);

          // Asignar la URL de la imagen al producto
          this.product.image = response.imageUrl;
        },
        (error) => {
          // Ocurrió un error al cargar la imagen en el servidor
          console.error('Error uploading image:', error);
          alert('Error uploading image');
        }
      );
    }
  }

  clearForm() {
    this.productForm.reset(this.initilaFormValues);
  }
  
  
}
