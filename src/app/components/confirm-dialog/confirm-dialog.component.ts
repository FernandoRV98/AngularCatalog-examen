import { Component, Inject } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  //CONSTUCTOR DEL DIALOGO PARA CONFIRMAR LA ELIMINACION DE UN PRODUCTO
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

}
