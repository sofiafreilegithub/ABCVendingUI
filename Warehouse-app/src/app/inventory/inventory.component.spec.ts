//import { ApiService } from 'src/app/api-service';
import { doesNotThrow } from 'assert';
import { of } from 'rxjs';
import { InventoryComponent } from './inventory.component'

describe('InventoryComponent', ()=> {
  let mockApiService : any;
  let component : InventoryComponent;
  beforeEach(() => {
    mockApiService = {
        updateInventory: jasmine.createSpy('mockApiService.updateInventory'),
        inventoryData$: jasmine.createSpy('mockApiService.inventoryData$')
    };
    component = new InventoryComponent(mockApiService);
    component.updateInventory();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  }); 

  describe('get inventory data', () => {
    it('updates inventory$', () => {
      expect(component.inventory$).toBeDefined();
  })})
})