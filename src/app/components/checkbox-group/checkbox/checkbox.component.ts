import { Component, Host, Input } from '@angular/core';
import { CheckboxGroupComponent } from '../checkbox-group.component';

@Component({
  selector: 'gu-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})

export class CheckboxComponent {
  @Input() label: string = '';
  @Input() value: any;

  constructor(@Host() public checkboxGroup: CheckboxGroupComponent) {}
}
