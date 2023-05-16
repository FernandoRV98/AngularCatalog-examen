import { Component, Directive, inject, Injectable, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/producto.model';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent {

  title = 'Catalogue of products';
  http = inject(HttpClient);
  products: Product[] = [];

  url_api = "https://fakestoreapi.com/products";

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<Product[]>(this.url_api).subscribe((data) => {
      this.products = data;
    });
  }
}

