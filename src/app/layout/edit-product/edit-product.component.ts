import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../model/product';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProductComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  constructor(private route: Router, private productService: ProductService) {}

  ngOnInit(): void {}

  onBackListProduct() {
    this.route.navigate(['product/list']);
  }

  onSaveProduct() {
    const id = Guid.create().toString().replace(/-/g, '');
    const abc: Product = {
      id,
      price: 1111111,
      categoryId: '123',
      description: '123123',
      name: '12313',
      status: true,
    };
    this.productService.saveProduct(abc).subscribe(() => {
      this.route.navigate(['product/list']).then();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
