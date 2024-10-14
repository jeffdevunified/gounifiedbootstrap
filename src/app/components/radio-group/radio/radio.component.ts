import { Component, Host, Input } from '@angular/core';
import { RadioGroupComponent } from '../radio-group.component';

@Component({
  selector: 'gu-radio',
  standalone: true,
  imports: [],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss'
})

export class RadioComponent {
  @Input() label: string = '';
  @Input() value: any;

  constructor(@Host() public radioGroup: RadioGroupComponent) {}
}
