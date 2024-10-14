import { CommonModule } from '@angular/common';
import { Component, QueryList, TemplateRef, ViewChildren, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgbAccordionModule, NgbAlertModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbOffcanvas, NgbOffcanvasModule, NgbPaginationModule, NgbPopoverConfig, NgbPopoverModule, NgbToastModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { LucideAngularModule } from 'lucide-angular';
import { AppDirective } from './app.directive';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { jsonData } from './app';
import { CheckboxGroupComponent } from './components/checkbox-group/checkbox-group.component';
import { CheckboxComponent } from './components/checkbox-group/checkbox/checkbox.component';
import { RadioGroupComponent } from './components/radio-group/radio-group.component';
import { RadioComponent } from './components/radio-group/radio/radio.component';
import { SwitchGroupComponent } from './components/switch-group/switch-group.component';
import { SwitchComponent } from './components/switch-group/switch/switch.component';

export type SortColumn = keyof TableDataSet | '';
export type SortDirection = 'asc' | 'desc' | '';
export const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };
export const compare = (v1: any, v2: any) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

export interface Alert {
  title: string;
  message: string;
  type: string;
  icon: string;
}

export interface Accordion {
  title: string;
  content: string;
}

export interface DropdownMenu {
  label: string;
  icon: string;
}

export interface TableDataSet {
  guid?: number;
  id: string;
  poNo: string;
  dateIssued: string | Date;
  status: number;
  origAmount: number;
  amtDue: number;
  amtToPay: number;
  notes: string;
  checked: boolean;
}

export interface Tabs {
  id: number;
  title: string;
  content: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet,
    CommonModule,
    NgbAccordionModule,
    NgbAlertModule,
    NgbDropdownModule,
    NgbNavModule,
    LucideAngularModule,
    NgSelectModule,
    NgbToastModule,
    NgbPaginationModule,
    NgbOffcanvasModule,
    AppDirective,
    MonacoEditorModule,
    NgbTooltipModule,
    NgbPopoverModule,
    CheckboxGroupComponent,
    CheckboxComponent,
    RadioGroupComponent,
    RadioComponent,
    SwitchGroupComponent,
    SwitchComponent,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'gounifiedbootstrap';
  show = true;
  private _headerCheckbox = false;
  private offcanvasService = inject(NgbOffcanvas);
  private modalService = inject(NgbModal);
  // public paymentOption: string[] = ['last-statement'];

  public paymentForm = new FormGroup({
    option: new FormControl([]),
    radio: new FormControl(''),
    switch: new FormControl([])
  })

  constructor(config: NgbPopoverConfig) {
    this.refreshData();
    config.placement = 'end';

    config.popperOptions = (options) => {
      // Offset option
			for (const modifier of options.modifiers || []) {
				if (modifier.name === 'offset' && modifier.options) {
					modifier.options['offset'] = () => [50, 8];
				}
			}

      // Remove Arrow
      options.onFirstUpdate = (state) => {
        console.log('onFirstUpdate', state);
        if (state.elements?.arrow) {
          state.elements.arrow.style.display = 'none';
        }
      };

			return options;
		};
  }

  public editorOptions = {
    readOnly: true,
    theme: 'vs-dark',
    language: 'json',
    minimap: { 
      enabled: false 
    },
    scrollBeyondLastLine: false
  };

  public code = JSON.stringify(jsonData, undefined, 2);

  showEditorCode(): void {
    console.log(JSON.stringify(JSON.parse(this.code)));
    console.log(JSON.parse(this.code));
  }

  showPaymentOptions(): void {
    console.log(this.paymentForm.controls.option.value);
  }

  public accordions: Accordion[] = [
    {
      title: "Website Options",
      content: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
    },
    {
      title: "Advanced Options",
      content: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
    }
  ]

  public alerts: Alert[] = [
    {
      title: 'Remaining credits on your account.',
      message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
      type: 'primary',
      icon: 'info'
    },
    {
      title: 'Remaining credits on your account.',
      message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
      type: 'secondary',
      icon: 'info'
    },
    {
      title: 'Shipped package has some issues.',
      message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
      type: 'warning',
      icon: 'info'
    },
    {
      title: 'Something went wrong with the deployment.',
      message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
      type: 'danger',
      icon: 'info'
    },
    {
      title: 'Successfully deployed your application.',
      message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
      type: 'success',
      icon: 'circle-check-big'
    },
  ]

  public dropdownMenus: DropdownMenu[] = [
    { 
      label: 'Global Lookup Tables',
      icon: 'globe'
    },
    { 
      label: 'Merchant',
      icon: 'user-round'
    },
    { 
      label: 'Paynow',
      icon: 'wallet-cards'
    },
    { 
      label: 'Secure Payment',
      icon: 'shield-check'
    },
    { 
      label: 'Payment Methods',
      icon: 'credit-card'
    },
    { 
      label: 'App Messages',
      icon: 'message-square-text'
    },
    { 
      label: 'Webhooks',
      icon: 'webhook'
    },
    { 
      label: 'Maintenance',
      icon: 'construction'
    },
  ]

  public dataSet: TableDataSet[] = [
    {
      id: 'INV0192824',
      poNo: 'WIRE TRANSFER-100-080223-004',
      dateIssued: '2023-20-10',
      status: 400,
      origAmount: 9200,
      amtDue: 9200,
      amtToPay: 0,
      notes: '',
      checked: false
    },
    {
      id: 'INV3240108',
      poNo: 'CREDIT CARD KRISTI KERSH',
      dateIssued: '2023-19-23',
      status: 951,
      origAmount: 2535.40,
      amtDue: 3629.50,
      amtToPay: 0,
      notes: '',
      checked: false
    },
    {
      id: 'INV3237198',
      poNo: 'WIRE TRANSFER-230026',
      dateIssued: '2023-12-20',
      status: 850,
      origAmount: 2629.50,
      amtDue: 1629.50,
      amtToPay: 0,
      notes: '',
      checked: false
    },
    {
      id: 'INV3231673',
      poNo: '4300242664',
      dateIssued: '2023-05-17',
      status: 401,
      origAmount: 1387.77,
      amtDue: 287.77,
      amtToPay: 0,
      notes: '',
      checked: false
    },
    {
      id: 'INV0192824',
      poNo: 'WIRE TRANSFER-100-080223-004',
      dateIssued: '2023-20-10',
      status: 400,
      origAmount: 9200,
      amtDue: 9200,
      amtToPay: 0,
      notes: '',
      checked: false
    },
    {
      id: 'INV3240108',
      poNo: 'CREDIT CARD KRISTI KERSH',
      dateIssued: '2023-19-23',
      status: 951,
      origAmount: 2535.40,
      amtDue: 3629.50,
      amtToPay: 0,
      notes: '',
      checked: false
    },
    {
      id: 'INV3237198',
      poNo: 'WIRE TRANSFER-230026',
      dateIssued: '2023-12-20',
      status: 850,
      origAmount: 2629.50,
      amtDue: 1629.50,
      amtToPay: 0,
      notes: '',
      checked: false
    },
    {
      id: 'INV3231673',
      poNo: '4300242664',
      dateIssued: '2023-05-17',
      status: 401,
      origAmount: 1387.77,
      amtDue: 287.77,
      amtToPay: 0,
      notes: '',
      checked: false
    },
    {
      id: 'INV0192824',
      poNo: 'WIRE TRANSFER-100-080223-004',
      dateIssued: '2023-20-10',
      status: 400,
      origAmount: 9200,
      amtDue: 9200,
      amtToPay: 0,
      notes: '',
      checked: false
    },
    {
      id: 'INV3240108',
      poNo: 'CREDIT CARD KRISTI KERSH',
      dateIssued: '2023-19-23',
      status: 951,
      origAmount: 2535.40,
      amtDue: 3629.50,
      amtToPay: 0,
      notes: '',
      checked: false
    },
    {
      id: 'INV3237198',
      poNo: 'WIRE TRANSFER-230026',
      dateIssued: '2023-12-20',
      status: 850,
      origAmount: 2629.50,
      amtDue: 1629.50,
      amtToPay: 0,
      notes: '',
      checked: false
    },
    {
      id: 'INV3231673',
      poNo: '4300242664',
      dateIssued: '2023-05-17',
      status: 401,
      origAmount: 1387.77,
      amtDue: 287.77,
      amtToPay: 0,
      notes: '',
      checked: false
    },
    {
      id: 'INV0192824',
      poNo: 'WIRE TRANSFER-100-080223-004',
      dateIssued: '2023-20-10',
      status: 400,
      origAmount: 9200,
      amtDue: 9200,
      amtToPay: 0,
      notes: '',
      checked: false
    },
    {
      id: 'INV3240108',
      poNo: 'CREDIT CARD KRISTI KERSH',
      dateIssued: '2023-19-23',
      status: 951,
      origAmount: 2535.40,
      amtDue: 3629.50,
      amtToPay: 0,
      notes: '',
      checked: false
    },
    {
      id: 'INV3237198',
      poNo: 'WIRE TRANSFER-230026',
      dateIssued: '2023-12-20',
      status: 850,
      origAmount: 2629.50,
      amtDue: 1629.50,
      amtToPay: 0,
      notes: '',
      checked: false
    },
    {
      id: 'INV3231673',
      poNo: '4300242664',
      dateIssued: '2023-05-17',
      status: 401,
      origAmount: 1387.77,
      amtDue: 287.77,
      amtToPay: 0,
      notes: '',
      checked: false
    },
  ]

  public tabs: Tabs[] = [
    {
      id: 1,
      title: 'General Settings',
      content: `Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth
                master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro
                keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat
                salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.`
    },
    {
      id: 2,
      title: 'Notifications',
      content: `Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth
                master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro
                keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat
                salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.`
    },
    {
      id: 3,
      title: 'Integration',
      content: `Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth
                master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro
                keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat
                salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.`
    }
  ]

  public tempDataSet: TableDataSet[] = [];
  public page = 1;
	public pageSize = 5;
	public collectionSize = this.dataSet.length;

  refreshData() {
    this.tempDataSet = this.dataSet.map((data, i) => ({ guid: i + 1, ...data })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
  }

	@ViewChildren(AppDirective)
  headers!: QueryList<AppDirective>;

	onSort({ column, direction }: SortEvent) {
		// resetting other headers
		for (const header of this.headers) {
			if (header.sortable !== column) {
				header.direction = '';
			}
		}

		// sorting countries
		if (direction === '' || column === '') {
			// this.tempDataSet = this.dataSet;
		} else {
			this.tempDataSet = [...this.dataSet].sort((a, b) => {
				const res = compare(a[column], b[column]);
				return direction === 'asc' ? res : -res;
			});
		}
	}

  get headerCheckbox(): boolean {
    return this._headerCheckbox;
  }

  set headerCheckbox(checked: boolean) {
    this.tempDataSet.forEach(c => c.checked = checked);
  }

  selectAll(): void {
    this.tempDataSet.forEach(c => c.checked = true);
  }

  selectStatus(status: string): void {
    this.tempDataSet.forEach(c => {
      if(status == 'active') {
        c.checked = c.status < 950 ? true : false;
      }
      else {
        c.checked = c.status >= 950 ? true : false;
      }
    });
  }

	openEnd(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { 
      position: 'end',
      panelClass: 'gu-offcanvas'
    });
	}
  
  changeRowStatus(data: boolean) {
    return data = !data;
  }

  open(content: TemplateRef<any>) {
		this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', 
      centered: true,
      modalDialogClass: 'gu-modal'
    })
	}
  
  openLg(content: TemplateRef<any>) {
		this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', 
      centered: true,
      size: 'lg',
      modalDialogClass: 'gu-modal'
    })
	}

  close(alert: Alert) {
		this.alerts.splice(this.alerts.indexOf(alert), 1);
	}

  remove(data: TableDataSet) {
    this.dataSet.splice(this.dataSet.indexOf(data), 1);
  }
}
