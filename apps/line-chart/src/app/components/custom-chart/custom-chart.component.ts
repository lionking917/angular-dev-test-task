import type { AfterViewInit, OnChanges } from '@angular/core';
import { ChangeDetectionStrategy, Component, Input, ViewChild, ElementRef } from '@angular/core';

import type { Coordinate } from '../../types';

@Component({
	selector: 'bp-custom-chart',
	templateUrl: './custom-chart.component.html',
	styleUrls: [ './custom-chart.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomChartComponent implements AfterViewInit, OnChanges {
	@Input() data: Coordinate[] = [];

	@ViewChild('myCanvas') myCanvas!: ElementRef;

	context!: CanvasRenderingContext2D;

	viewInited = false;

	constructor() {
		console.log('custom-chart-constructor');
	}

	ngAfterViewInit(): void {
		const context = (<HTMLCanvasElement> this.myCanvas.nativeElement).getContext('2d');

		if (context)
			this.context = context;

		this.viewInited = true;

		this.draw();
	}

	ngOnChanges(): void {
		this.draw();
	}

	draw(): void {
		if (!this.viewInited)
			return;

		this.context.clearRect(0, 0, 500, 500);

		this.context.beginPath();

		// Draw X-Axis
		this.context.moveTo(0, 500);

		this.context.lineTo(500, 500);

		// Draw Y-Axis
		this.context.moveTo(0, 0);

		this.context.lineTo(0, 500);

		const maxY = Math.max.apply(null, this.data.map(o => o.y));

		for (const [ index, item ] of this.data.entries()) {
			const x = index * 50;
			const y = (500 - 400 / maxY * item.y);

			if (index === 0)
				this.context.moveTo(x, y);
			 else
				this.context.lineTo(x, y);

		}

		this.context.lineWidth = 5;

		this.context.stroke();
	}
}
