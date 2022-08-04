
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  inventoryData$: BehaviorSubject<[]> = new BehaviorSubject<[]>(undefined);
  inventoryTotals$: BehaviorSubject<[]> = new BehaviorSubject<[]>(undefined);
  constructor(private http: HttpClient) {}

  public makeRequest() {
    let options = { headers: new HttpHeaders ({ 'Content-Type' : 'application/json ', })}
    const resp$ = this.http
      .get("https://localhost:44378/api/inventory", options )
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .subscribe((data: any) => {
        this.inventoryData$.next(data);
      });
  }

  public updateInventory(productToUpdate: string, newQty: number) {
    let options = { headers: new HttpHeaders ({ 'Content-Type' : 'application/json ', })}
    const apiUrl = `https://localhost:44378/api/updateinventory/1/${productToUpdate}/${newQty}`;   // hardcoded to warehouse 1
    this.http
      .get(apiUrl, options )
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .subscribe((data: any) => {
        this.inventoryData$.next(data);
        this.inventoryTotals$.next(data);
      });
  }
}