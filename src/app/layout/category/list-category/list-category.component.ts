import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-category',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCategoryComponent {
  constructor(private route: Router) {}
  onBackProduct() {
    this.route.navigate(['product/list']);
  }
}
