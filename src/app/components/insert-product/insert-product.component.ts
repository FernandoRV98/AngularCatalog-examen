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
  //SE CREA UN FORMULARIO PARA INSERTAR LOS DATOS DEL PRODUCTO
  productForm: FormGroup;
  //SE CREA UN OBJETO PARA GUARDAR LOS VALORES INICIALES DEL FORMULARIO
  initilaFormValues: any = {};
  
  // Inyectar el servicio de HttpClient y Location, además de FormBuilder y MatDialog
  // FormBuilder es el objeto que permite crear formularios reactivos
  // MatDialog es el objeto que permite manipular los diálogos
  // Location es el objeto que permite manipular la URL
  // HttpClient es el objeto que permite realizar peticiones HTTP
  constructor(private http: HttpClient, private location: Location, private formBuilder: FormBuilder, private dialog: MatDialog) {
    // Crear el formulario con los campos title, description, price y category
    this.productForm = this.formBuilder.group({
      //SE CREAN LOS CAMPOS DEL FORMULARIO
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required]
    });
    //SE GUARDAN LOS VALORES INICIALES DEL FORMULARIO
    this.initilaFormValues = this.productForm.value;
    
  }
  //METODO ENVIAR EL PRODUCTOR GUARDADO AL CATALOGO DE CARDS ======> NO FUNCIONA 
  @Output() productSaved: EventEmitter<Product> = new EventEmitter<Product>();

  //SE CREA UN METODO PARA GUARDAR EL PRODUCTO
  saveProduct() {
    const url_api = 'https://fakestoreapi.com/products/'
    // Realizar la lógica para guardar el producto en el dashboard
    this.http.post<any>(url_api, this.product).subscribe(
      (response) => {
        // Producto guardado exitosamente
        console.log('Product saved successfully:', response);
        // Restablecer los campos del formulario
        this.product = {};
        // Mostrar un mensaje de éxito
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '250px',
          data: { title: 'Product saved successfully' }
        });

        //console.log(response.product);
        //recargar el dashboard
        //this.location.back();

        //LIMIAR EL FORMULARIO =====> NO FUNCIONA
        this.clearForm();

        //LINEA DE CODIGO PARA ENVIAR EL PRODUCTO GUARDADO AL CATALOGO DE CARDS ======> NO FUNCIONA
        this.productSaved.emit(response.product);
        
      },
      (error) => {
        // Ocurrió un error al guardar el producto
        console.error('Error saving product:', error);
        alert('Error saving product');
      }
    );
  }

  //SE CREA UN METODO PARA CARGAR LA IMAGEN DEL PRODUCTO =====> NO FUNCIONA ======> POR FA AYUDAME CON ESTE METODO ===> NO SE COMO HACERLO
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

  //SE CREA UN METODO PARA LIMPIAR EL FORMULARIO =====> NO FUNCIONA

  clearForm() {
    this.productForm.reset(this.initilaFormValues);
  }
  
  
}
