import { ApiService } from 'src/app/api-service';
import { doesNotThrow } from 'assert';
import { BehaviorSubject, of } from 'rxjs';
import { InventoryComponent } from './inventory.component'
import { Product } from './inventory.interface'

describe('InventoryComponent', ()=> {
  let mockApiService : any;
  let component : InventoryComponent;
  const mockProduct: Product = {
    WarehouseId: 1,
    warehouseName: 'MockWarehouseName',
    ProductCategoryId: 1,
    productCategoryName: 'MockCategoryName',
    ProductId: 1,
    productName: 'MockProductName',
    productCount: 10,
    LocationId: 1
  }
  let mockProductArray : [Product] = [mockProduct];
  
  beforeEach(() => {
    mockApiService = {
        updateInventory: jasmine.createSpy('mockApiService.updateInventory'),
        makeRequest: jasmine.createSpy('mockApiService.makeRequest'),
    };
    mockApiService.inventoryData$ = of(mockProductArray);
    mockApiService.inventoryTotals$ = of(mockProductArray);
    component = new InventoryComponent(mockApiService);
    component.initialize();
    component.updateInventory();    
  });

  describe('get inventory data', () => {
    it('update inventory', (done) => {
      expect(component.totals$).toBeDefined();
      
      component.totals$.subscribe((value) => {
        const p: Product = value.find((v : Product)=> v.productCategoryName ='MockCategoryName');
        console.log(p);
        expect(p.productCategoryName)
          .toEqual('MockCategoryName');
        done();
      });

      expect(component.categoryTotals[0].total).toEqual(10);
  })})
})