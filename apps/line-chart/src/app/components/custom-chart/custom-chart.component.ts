import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'bp-custom-chart',
	templateUrl: './custom-chart.component.html',
	styleUrls: [ './custom-chart.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomChartComponent {
	@Input() data: any;

	labels = [ '', '', '', '', '', '', '', '', '', '' ];

	constructor() {
		console.log('custom-chart-constructor');
	}
}
