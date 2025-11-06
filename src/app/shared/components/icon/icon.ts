import { Component } from '@angular/core';

@Component({
  selector: 'app-icon',
  imports: [],
  template: '<span class="material-icons-outlined"><ng-content></ng-content></span>'
})
export class Icon {}
