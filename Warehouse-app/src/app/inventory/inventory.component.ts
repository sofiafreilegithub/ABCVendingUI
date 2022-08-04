import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api-service';
import { Product } from './inventory.interface'


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit{
  inventory$ = this.apiService.inventoryData$;
  totals$ = this.apiService.inventoryTotals$;
  categories = [];
  products = [];
  warehouses = [];
  categoryTotals = [];
  productToupdate = '';
  newProductQty: number = 0;

  constructor(
    private apiService : ApiService
  ) { }

  ngOnInit(): void {
    this.initialize();
  }
  
  updateInventory(){
    this.apiService.updateInventory(this.productToupdate, this.newProductQty);
    this.getTotalsByCategory();
  }

  initialize() {
    // don't mind this code.. lists of products, categories, warehouses 
    // would more naturally come from api context call,
    // but creating lists here since we don't have it
    this.inventory$.subscribe((products: Product[])=>{
      if (products) {
        products.forEach((p)=> {
            if (!this.warehouses.includes(p.warehouseName)) this.warehouses.push(p.warehouseName)
            if (!this.categories.includes(p.productCategoryName)) this.categories.push(p.productCategoryName)
            if (!this.products.includes(p.productName)) this.products.push(p.productName)
          }
        )
      }
    })
  }

  getTotalsByCategory() {
    this.totals$.subscribe((products: Product[])=>{
      if (products) {
        this.categoryTotals = [];
        this.categories.forEach((c)=> {
          this.products.forEach((p)=> {
            let byCatProd = products
            .filter((product) => product.productCategoryName === c && product.productName === p)
            .map((r) => r.productCount);
            if (byCatProd.length > 0) {
              let totalCatProd = byCatProd.reduce((p, c) => p + c, 0);
              this.categoryTotals.push({categoryName: c, productName: p, total: totalCatProd});
            }
          })
        })
      }
    })
  }
}
