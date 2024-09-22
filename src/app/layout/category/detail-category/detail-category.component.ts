import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
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
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { FormField } from '../../../constant/enum';
import { Category } from '../../../model/category';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-detail-category',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './detail-category.component.html',
  styleUrl: './detail-category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailCategoryComponent implements OnInit {
  @Input() data: any;
  @Input() isDetail = false;
  @Output() child = new EventEmitter<boolean | Category>();
  nameCategory = '';
  descriptionCategory = '';
  formField = FormField;
  categoryForm!: FormGroup;

  constructor(
    private route: Router,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: [this.data?.name || '', Validators.required],
      description: [this.data?.description || '', Validators.required],
    });
  }

  onBackCategory() {
    if (this.isDetail) {
      this.child.emit(true);
    } else {
      this.route.navigate(['category/list']);
    }
  }

  onSaveCategory() {
    const id = Guid.create().toString().replace(/-/g, '');
    const category = {
      id,
      name: this.categoryForm.get(FormField.name)?.value,
      description: this.categoryForm.get(FormField.description)?.value,
    };
    this.categoryService.saveCategory(category).subscribe({
      next: () => {
        this.route.navigate(['category/list']);
      },
    });
  }

  onUpdateCategory() {
    const id = this.data?.id;
    const category = {
      id,
      name: this.categoryForm.get(FormField.name)?.value,
      description: this.categoryForm.get(FormField.description)?.value,
    };
    this.categoryService.updateCategory(id, category).subscribe({
      next: (value) => {
        this.child.emit(value);
      },
    });
  }
}
