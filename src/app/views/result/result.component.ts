import { Component, Input } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';

import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-result',
  styleUrls: ['./result.component.scss'],
  templateUrl: './result.component.html'
})

export class ResultComponent {
  @Input() name;
  @Input() details;

  updateForm: FormGroup = new FormGroup({
    name: new FormControl,
    email: new FormControl,
    phone: new FormControl,
    website: new FormControl,
    company: new FormControl
  });

  id: number;
  editMode: boolean = false;
  notification: boolean = false;
  notificationDel: boolean = false;
  destroyComponent: boolean = false;

  constructor(public httpService: HttpService) {};

  ngOnInit() {
    this.id = this.details.id;
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  saveChanges(updateForm: FormGroup) {
    this.editMode = false;
    this.notification = true;
    this.dismissNotification();

    let newValues = {
      'name': updateForm.value.name !== null ? updateForm.value.name : this.details.name,
      'email': updateForm.value.email !== null ? updateForm.value.email : this.details.email,
      'phone': updateForm.value.phone !== null ? updateForm.value.phone : this.details.phone,
      'website': updateForm.value.website !== null ? updateForm.value.website : this.details.website,
      'company': updateForm.value.company !== null ? updateForm.value.company : this.details.company
    };

    this.details = newValues;
    return this.httpService.updateUser(this.id, newValues);
  }

  deleteUser() {
    this.editMode = false;
    this.notificationDel = true;
    this.dismissNotification();
    return this.httpService.deleteUser(this.id);
  }

  public async dismissNotification(): Promise<void> {
    while (this.notification || this.notificationDel) {
      await new Promise<void>(resolve => {
          setTimeout(resolve, 2000);
      });

      let destroyable = false;

      if (this.notificationDel) {
        destroyable = true;
      }

      this.notification = false;
      this.notificationDel = false;

      if (destroyable) {
        this.destroyComponent = true;
      }
    }
  }

}

