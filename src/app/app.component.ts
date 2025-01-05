import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SimplebarAngularModule } from 'simplebar-angular';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,FormsModule,SimplebarAngularModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'boilerplate';
  numbers = Array(50).fill(0);
  options = { autoHide: false, scrollbarMinSize: 100 };
}
