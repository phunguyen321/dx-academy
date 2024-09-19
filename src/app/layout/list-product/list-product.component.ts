import {
  ChangeDetectionStrategy,
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
import { combineLatest, map, Subject, takeUntil } from 'rxjs';
import { DetailProductComponent } from '../detail-product/detail-product.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { PricePipe } from '../../pipe/price.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryPipe } from '../../pipe/category.pipe';
import { CategoryService } from '../../services/category/category.service';
import { MatCardModule } from '@angular/material/card';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CategoryPick } from '../../model/category';
import { FormField } from '../../constant/enum';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    PricePipe,
    CategoryPipe,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss',
})
export class ListProductComponent implements OnInit, OnDestroy {
  @ViewChild('detailContainer', { read: ViewContainerRef, static: true })
  containerRef!: ViewContainerRef;
  productData: ProductTable[] = [];
  categoryData: string[] = [];
  displayedColumns: string[] = ['name', 'price', 'category', 'status'];
  isDetailVisible = false;
  productForm!: FormGroup;
  formField = FormField;
  originalProductData: ProductTable[] = [];
  destroy$ = new Subject();
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cfr: ComponentFactoryResolver,
    private route: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [''],
      category: [''],
    });
    combineLatest([
      this.productService.getListProduct(),
      this.categoryService.getListCategory(),
    ])
      .pipe(
        map(([listProduct, listCategory]) => {
          const products = listProduct.map((prod) => {
            const nameCategory = listCategory.find(
              (cate) => cate.id === prod.categoryId
            )?.name;
            return {
              id: prod.id,
              name: prod.name,
              price: prod.price,
              category: nameCategory,
              status: prod.status,
            };
          });
          const category = listCategory.map((cate) => cate.name);

          return [products, category];
        })
      )
      .subscribe(([products, category]) => {
        this.productData = products as ProductTable[];
        this.categoryData = category as string[];
        this.originalProductData = this.productData;
      });
  }

  onRowClick(row: any) {
    this.isDetailVisible = true;
    this.containerRef.clear();
    const factory = this.cfr.resolveComponentFactory(DetailProductComponent);
    const componentRef = this.containerRef.createComponent(factory);
    componentRef.instance.data = row;
  }

  goBack() {
    this.isDetailVisible = false;
    this.containerRef.clear();
  }

  goToCategory() {
    this.route.navigate(['category/list']);
  }

  onCreateProduct() {
    this.route.navigate(['product/create']).then();
  }

  searchProduct(formField: string) {
    switch (formField) {
      case FormField.name:
        const abc = this.productForm.get(formField)?.value;
        console.log(abc);
        this.productData = this.originalProductData.filter((prod) =>
          prod.name.includes(abc)
        );
        break;
      case FormField.category:
        console.log(321);
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
