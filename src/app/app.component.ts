import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/common/header/header.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'academy';
  isDisplayHeader = false;

  constructor(private route: Router) {
    this.route.events.subscribe(() => {
      this.isDisplayHeader = this.route.url !== '/login';
    });
  }
}
