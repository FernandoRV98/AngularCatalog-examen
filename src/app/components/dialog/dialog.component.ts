import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  //CONSTRUCTOR DEL DIALOG
  //SE INYECTA EL SERVICIO DE MAT_DIALOG_DATA
  //SE ALMACENA EN LA VARIABLE DATA
  //SE UTILIZA PARA MOSTRAR EL MENSAJE DE CONFIRMACION
  constructor( @Inject(MAT_DIALOG_DATA) public data: any) { }
}
