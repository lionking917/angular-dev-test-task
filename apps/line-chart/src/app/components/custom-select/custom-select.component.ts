import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

import type { Option } from '../../types';

@Component({
	selector: 'bp-custom-select',
	templateUrl: './custom-select.component.html',
	styleUrls: [ './custom-select.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSelectComponent {
	@Input() options: Option[] = [];

	@Input() selectedValue = '';

	@Output() readonly selectChange = new EventEmitter();

	constructor() {
		console.log('custom-select-constructor');
	}

	onChange(): void {
		this.selectChange.emit(this.selectedValue);
	}

}
