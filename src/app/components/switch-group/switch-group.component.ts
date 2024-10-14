import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'gu-switch-group',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SwitchGroupComponent,
      multi: true
    }
  ],
  template: `<ng-content></ng-content>`,
})
export class SwitchGroupComponent implements ControlValueAccessor {

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
    const index = this.value.indexOf(currentValue);

    if(index > -1) {
      this.value = [...this.value.slice(0, index), ...this.value.slice(index + 1)];
    }
    else {
      this.value = [...this.value, currentValue];
    }

    this.onChange(this.value);
    this.onTouch();
  }

  isChecked(valueToCheck: any) {
    return this.value.includes(valueToCheck);
  }

}
