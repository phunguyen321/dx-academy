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
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../../model/category';
import { CategoryService } from '../../../services/category/category.service';
import { DetailCategoryComponent } from '../detail-category/detail-category.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-list-category',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCategoryComponent implements OnInit, OnDestroy {
  @ViewChild('detailContainer', { read: ViewContainerRef, static: true })
  containerRef!: ViewContainerRef;
  categoryData: Category[] = [];
  originalCategoryData: Category[] = [];
  displayedColumns: string[] = ['name', 'description'];
  isDetailVisible = false;
  isLoading = false;
  categoryKeyword = '';
  destroy$ = new Subject();

  constructor(
    private route: Router,
    private categoryService: CategoryService,
    private cfr: ComponentFactoryResolver,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.categoryService
      .getListCategory()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (cate) => {
          this.isLoading = false;
          this.categoryData = cate;
          this.originalCategoryData = cate;
          this.cd.detectChanges();
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  onRowClick(row: Category) {
    this.isDetailVisible = true;
    this.containerRef.clear();
    const factory = this.cfr.resolveComponentFactory(DetailCategoryComponent);
    const componentRef = this.containerRef.createComponent(factory);
    componentRef.instance.data = row;
    componentRef.instance.isDetail = true;
    componentRef.instance.child.subscribe((value) => {
      if (value) {
        if (typeof value === 'object') {
          const index = this.categoryData.findIndex((p) => p.id === value.id);
          this.categoryData[index] = value as Category;
          this.categoryData = [...this.categoryData];
          this.originalCategoryData = this.categoryData;
        }
        this.containerRef.clear();
        this.isDetailVisible = false;
        this.cd.detectChanges();
      }
    });
  }

  searchCategory() {
    this.categoryData = this.originalCategoryData.filter((cate) =>
      cate.name.toLowerCase().includes(this.categoryKeyword.toLowerCase())
    );
  }

  onCreateCategory() {
    this.route.navigate(['category/create']);
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
