import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailProductComponent {
  @Input() data: any;
}
