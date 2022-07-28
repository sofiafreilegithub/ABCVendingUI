
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  inventoryData$: BehaviorSubject<[]> = new BehaviorSubject<[]>(undefined);
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

  public updateInventory() {
    let options = { headers: new HttpHeaders ({ 'Content-Type' : 'application/json ', })}
    //random number to simulate inventory changes, calling the api with this parameter will substract from existing unit count
    const random = Math.floor(Math.random() * (99 - 10)) + 10; 
    const resp$ = this.http
      .get("https://localhost:44378/api/updateinventory/" + random.toString(), options )
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .subscribe((data: any) => {
        this.inventoryData$.next(data);
      });
  }
}