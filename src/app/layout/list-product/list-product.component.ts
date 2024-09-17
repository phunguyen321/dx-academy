import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ProductService } from '../../services/product/product.service';
import { Product, ProductTable } from '../../model/product';
import { map, Subject, takeUntil } from 'rxjs';
import { DetailProductComponent } from '../detail-product/detail-product.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss',
})
export class ListProductComponent implements OnInit, OnDestroy {
  @ViewChild('detailContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  productData: ProductTable[] = [];
  displayedColumns: string[] = ['name', 'price', 'status'];
  isDetailVisible = false;
  destroy$ = new Subject();
  constructor(
    private productService: ProductService,
    private resolver: ComponentFactoryResolver,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.productService
      .getListProduct()
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        this.productData = products.map((pro) => {
          return {
            name: pro.name,
            price: pro.price,
            status: pro.status,
          };
        });
        console.log(this.productData);
      });
  }

  onRowClick(row: any) {
    this.isDetailVisible = true;
    this.container.clear();
    const factory = this.resolver.resolveComponentFactory(
      DetailProductComponent
    );
    const componentRef = this.container.createComponent(factory);
    componentRef.instance.data = row;
  }

  goBack() {
    this.isDetailVisible = false;
    this.container.clear();
  }

  onCreateProduct(){
    this.route.navigate(['product/create']).then();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
