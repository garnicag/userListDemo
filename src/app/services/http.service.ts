import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../environments/environment';

@Injectable()
export class HttpService {
  constructor(public http: HttpClient) {};

  getUsers(): Observable<any> {
    return this.http.get(environment.apiGetUsers);
  }

  createUser(name, email, phone, website, company) {
    return this.http.post(environment.apiGetUsers, {
      'id': 20,
      'name': name,
      'email': email,
      'phone': phone,
      'website': website,
      'company': {
        'name': company
      }
    }).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log('Error on user creation ', err);
      }
    );
  }

  updateUser(id, newValues) {
    return this.http.put(environment.apiGetUsers+'/'+id, {
      'id': id,
      'name': newValues.name,
      'email': newValues.email,
      'phone': newValues.phone,
      'website': newValues.website,
      'company': {
        'name': newValues.company
      }
    }).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log('Error on user update ', err);
      }
    );
  }

  deleteUser(id) {
    return this.http.delete(environment.apiGetUsers+'/'+id).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log('Error on user delete ', err);
      }
    );
  }
}