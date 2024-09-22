import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Subject, takeUntil } from 'rxjs';
import { FormField } from '../../../constant/enum';
import { Category } from '../../../model/category';
import { Product } from '../../../model/product';
import { CategoryService } from '../../../services/category/category.service';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
  ],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailProductComponent {
  @Input() data: any;
  @Input() isDetail = false;
  @Output() child = new EventEmitter<boolean | Product>();
  productForm!: FormGroup;
  formField = FormField;
  destroy$ = new Subject();
  categoryList: Category[] = [];

  constructor(
    private route: Router,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    if (!this.isDetail) {
      if ('categoryData' in history.state) {
        this.categoryList = history.state?.categoryData;
        history.replaceState({}, '');
      } else {
        this.categoryService
          .getListCategory()
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (cate) => {
              this.categoryList = cate;
            },
          });
      }
    } else {
      this.categoryList = this.data?.category;
    }
    this.productForm = this.formBuilder.group({
      name: [this.data?.row?.name || '', Validators.required],
      price: [
        this.data?.row?.price || '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      category: [this.data?.row?.categoryId || '', Validators.required],
      description: [this.data?.row?.description || ''],
      status: [this.data?.row?.status ?? null, Validators.required],
    });
  }

  onBackListProduct() {
    if (this.isDetail) {
      this.child.emit(true);
    } else {
      this.route.navigate(['product/list']);
    }
  }

  onSaveProduct() {
    const id = Guid.create().toString().replace(/-/g, '');
    const product: Product = {
      id,
      price: Number(this.productForm.get(FormField.price)?.value),
      categoryId: this.productForm.get(FormField.category)?.value,
      description: this.productForm.get(FormField.description)?.value,
      name: this.productForm.get(FormField.name)?.value,
      status: this.productForm.get(FormField.status)?.value,
    };
    this.productService.saveProduct(product).subscribe(() => {
      this.route.navigate(['product/list']).then();
    });
  }

  onUpdateProduct() {
    const idUpdate = this.data?.row.id;
    const product: any = {
      id: idUpdate,
      price: Number(this.productForm.get(FormField.price)?.value),
      categoryId: this.productForm.get(FormField.category)?.value,
      description: this.productForm.get(FormField.description)?.value,
      name: this.productForm.get(FormField.name)?.value,
      status: this.productForm.get(FormField.status)?.value,
    };
    this.productService.updateProduct(idUpdate, product).subscribe({
      next: (val) => {
        this.child.emit(val);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
