import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

  status!: boolean;
  sideBarStatus(status: boolean) {
    this.status = status;
  }

}
