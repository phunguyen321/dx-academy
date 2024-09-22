import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private route: Router) {}

  goToProduct() {
    this.route.navigate(['product/list']);
  }

  goToCategory() {
    this.route.navigate(['category/list']);
  }

  logout() {
    localStorage.removeItem('token');
    this.route.navigate(['login']);
  }
}
