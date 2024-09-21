import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { Category, CategoryPick } from '../../model/category';
import { FormField } from '../../constant/enum';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductPipe } from '../../pipe/product.pipe';
import { StatusProductDirective } from '../../directive/status-product.directive';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    PricePipe,
    ProductPipe,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    StatusProductDirective,
  ],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  originalCategoryData: Category[] = [];
  isLoading = false;
  dataFilter: { name: string; category: string } = { name: '', category: '' };
  destroy$ = new Subject();
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cfr: ComponentFactoryResolver,
    private route: Router,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
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
            return { ...prod, category: nameCategory };
          });
          return { products, listCategory };
        })
      )
      .subscribe({
        next: ({ products, listCategory }) => {
          this.productData = products as ProductTable[];
          this.categoryData = listCategory.map((cate) => cate.name) as string[];
          this.originalCategoryData = listCategory;
          this.originalProductData = this.productData;
          this.isLoading = false;
          this.cd.detectChanges();
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  onRowClick(row: any) {
    this.isDetailVisible = true;
    this.containerRef.clear();
    const factory = this.cfr.resolveComponentFactory(DetailProductComponent);
    const componentRef = this.containerRef.createComponent(factory);
    componentRef.instance.data = { row, category: this.originalCategoryData };
    componentRef.instance.isDetail = true;
    componentRef.instance.child.subscribe((value: boolean | Product) => {
      if (value) {
        if (typeof value === 'object') {
          const index = this.productData.findIndex((p) => p.id === value.id);
          const category = this.originalCategoryData.find(
            (cate) => cate.id === value.categoryId
          )?.name;
          const product = { ...value, category };
          this.productData[index] = product as ProductTable;
          this.productData = [...this.productData];
          this.originalProductData = this.productData;
        }
        this.containerRef.clear();
        this.isDetailVisible = false;
        this.cd.detectChanges();
      }
    });
  }

  goBack() {
    this.isDetailVisible = false;
    this.containerRef.clear();
  }

  goToCategory() {
    this.route.navigate(['category/list']);
  }

  onCreateProduct() {
    this.route.navigate(['product/create'], {
      state: { categoryData: this.originalCategoryData },
    });
  }

  searchProduct(formField: string) {
    switch (formField) {
      case FormField.name:
        const name = this.productForm.get(formField)?.value;
        this.dataFilter.name = name;
        break;
      case FormField.category:
        const category = this.productForm.get(formField)?.value;
        this.dataFilter.category = category;
        break;
      default:
        break;
    }
    this.filter();
  }

  filter() {
    this.productData = this.originalProductData.filter(
      (prod) =>
        (!this.dataFilter.name ||
          prod.name
            .toLowerCase()
            .includes(this.dataFilter.name.toLowerCase())) &&
        (!this.dataFilter.category ||
          prod.category === this.dataFilter.category)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
