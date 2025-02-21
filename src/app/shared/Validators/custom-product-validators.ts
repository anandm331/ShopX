import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static stockValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    return control.value !== null && control.value >= 0
      ? null
      : { invalidStock: 'Stock quantity must be 0 or greater' };
  };

  static categoryValidator(validCategories: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return validCategories.includes(control.value)
        ? null
        : { invalidCategory: `Invalid category selected. Choose from: ${validCategories.join(', ')}` };
    };
  }

  static productNameValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const regex = /^[a-zA-Z0-9 ]+$/;
    return regex.test(control.value) 
      ? null
      : { invalidProductName: 'Product name must contain only letters, numbers, and spaces' };
  };

  static minPrice(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value !== null && control.value >= min
        ? null
        : { minPrice: { requiredMin: min } };
    };
  }
}
