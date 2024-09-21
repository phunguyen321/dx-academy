import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'academy';
  showLogoutButton = false;
  constructor(private route: Router) {
    this.route.events.subscribe(() => {
      this.showLogoutButton = this.route.url !== '/login';
    });
  }
  logout() {
    localStorage.removeItem('token');
    this.route.navigate(['login']);
  }
}
