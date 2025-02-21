import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { PRODUCT_FORM_CONFIG } from '../../../config/product.config';
import { CustomValidators } from '../../../shared/Validators/custom-product-validators';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./add-product.component.scss'],
  encapsulation: ViewEncapsulation.Emulated, 
})
export class AddProductComponent implements OnInit {
  addProductForm!: FormGroup;
  formSchema = PRODUCT_FORM_CONFIG.fields;
  formTitle = PRODUCT_FORM_CONFIG.formTitle;
  validCategories = ['Electronics', 'Fashion', 'Home & Kitchen', 'Books'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    let formGroup: any = {};

    this.formSchema.forEach((field) => {
      let validators = this.getValidators(field);
      formGroup[field.name] = [null, validators];
    });

    this.addProductForm = this.fb.group(formGroup);
  }

  getValidators(field: any) {
    let formValidators: ValidatorFn[] = [];

    if (field.validators) {
      field.validators.forEach((val: string) => {
        if (val === 'required') formValidators.push(Validators.required);
        else if (val === 'stockValidator') formValidators.push(CustomValidators.stockValidator);
        else if (val === 'categoryValidator') formValidators.push(CustomValidators.categoryValidator(this.validCategories));
        else if (val === 'productNameValidator') formValidators.push(CustomValidators.productNameValidator);
        else if (val.startsWith('min')) {
          const minValue = +val.split(':')[1];
          formValidators.push(CustomValidators.minPrice(minValue));
        }
      });
    }

    return formValidators;
  }

  onSubmit() {
    if (this.addProductForm.valid) {
      console.log('Product Added:', this.addProductForm.value);
      alert('Product added successfully!');
      this.addProductForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }
}
