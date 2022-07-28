import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  implements OnInit {
  title = 'Warehouse-app';

  constructor(
    private apiService : ApiService
  ) {}

  ngOnInit(): void {
    this.apiService.makeRequest();
  }
}
