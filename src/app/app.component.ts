import { Component } from '@angular/core';

import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  details = [];

  constructor(public httpService: HttpService) {};

  getUsers() {
    return this.httpService.getUsers().subscribe(
      result => {
        this.details = result
      }
    );
  }

  ngOnInit() {
    this.getUsers();
  }
}
