import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'gu-radio-group',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RadioGroupComponent,
      multi: true
    }
  ],
  template: `<ng-content></ng-content>`,
})
export class RadioGroupComponent implements ControlValueAccessor {

  public value: any;
  public onChange!: (value: any) => {};
  public onTouch!: () => {};

  constructor() {}

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  toggleValue(currentValue: any) {
    this.value = currentValue;

    this.onChange(this.value);
    this.onTouch();
  }

  isChecked(valueToCheck: any) {
    return this.value == valueToCheck;
  }

}
