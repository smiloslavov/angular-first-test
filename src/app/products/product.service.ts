import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productURL = "api/products/products.json"

    constructor(private http: HttpClient) {}

    private handleError(err: HttpErrorResponse) {
      let errorMessage = "Somethign went wrong!";

      if (err.error instanceof ErrorEvent) {
        errorMessage = err.error.message;
        console.log(errorMessage);
      }
      
      return throwError(errorMessage);
    }

    getProducts(): Observable<IProduct[]> {
      return this.http.get<IProduct[]>(this.productURL).pipe(
        tap(data => console.log("Data all: " + JSON.stringify(data))),
        catchError(this.handleError)
      );
    }
}