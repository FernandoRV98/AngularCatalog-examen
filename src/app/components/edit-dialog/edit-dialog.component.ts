import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import { Product } from 'src/app/models/producto.model';
import { HttpClient } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {

  // Crear un formulario para actualizar los datos del producto
  updateForm: FormGroup;
  updatedProduct: Product = { ...this.data.product };

  // Inyectar el servicio de HttpClient, MatDialogRef y MAT_DIALOG_DATA, además de FormBuilder
  // MAT_DIALOG_DATA es el objeto que se recibe desde el componente padre
  // MatDialogRef es el objeto que permite manipular el diálogo
  // FormBuilder es el objeto que permite crear formularios reactivos
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    // Crear el formulario con los campos title, description, price y category
    // El formulario debe tener los valores actuales del producto
    // title, description, price y category son los nombres de los campos del formulario
    this.updateForm = this.formBuilder.group({
      title: [this.updatedProduct.title, Validators.required],
      description: [this.updatedProduct.description, Validators.required],
      price: [this.updatedProduct.price, Validators.required],
      category: [this.updatedProduct.category, Validators.required],
    });
  }

  //METODO PARA CERRAR EL DIALOGO
  saveChanges() {
    if (this.updateForm.valid) {
      // Realizar la lógica de actualización y asignar los valores del formulario a this.updatedProduct
      this.updatedProduct.title = this.updateForm.value.title;
      this.updatedProduct.description = this.updateForm.value.description;
      this.updatedProduct.price = this.updateForm.value.price;
      this.updatedProduct.category = this.updateForm.value.category;
      // Luego de asignar los valores, cerrar el diálogo y emitir el producto actualizado
      this.dialogRef.close({ product: this.updatedProduct });
    }
  }

  //METODO PARA CARGAR LA IMAGEN ======> NO FUNCIONA =====> NO SE COMO HACERLO, ARREGLENDOLO POR FAVOR :(
  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append('image', file);
  
      // Realizar la lógica para enviar el formulario de datos al servidor
      // Puedes usar el servicio HttpClient de Angular para esto
      this.http.post<any>('URL_DEL_ENDPOINT', formData).subscribe(
        (response) => {
          // La imagen se cargó correctamente en el servidor
          console.log('Image uploaded successfully:', response);
          // Actualizar el campo de imagen del producto con la URL de la imagen cargada
          this.updatedProduct.image = response.imageUrl;
        },
        (error) => {
          // Ocurrió un error al cargar la imagen en el servidor
          console.error('Error uploading image:', error);
        }
      );
    }
  }

}
