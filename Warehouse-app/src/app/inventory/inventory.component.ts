import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api-service';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  inventory$ = this.apiService.inventoryData$;
  constructor(
    private apiService : ApiService
  ) { }

  updateInventory(){
    this.apiService.updateInventory();
  }
}
