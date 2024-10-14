import { Component, Host, Input } from '@angular/core';
import { SwitchGroupComponent } from '../switch-group.component';

@Component({
  selector: 'gu-switch',
  standalone: true,
  imports: [],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss'
})

export class SwitchComponent {
  @Input() label: string = '';
  @Input() value: any;

  constructor(@Host() public switchGroup: SwitchGroupComponent) {}
}
