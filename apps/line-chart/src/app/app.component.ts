import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';

import type { CryptoCurrencyCode } from '@bp/shared-models';
import { CRYPTO_CURRENCY_CODES_AND_NAMES } from '@bp/shared-models';

import { FirebaseService } from '../services';

import { QUERY_LIMIT } from './constants';
import type { Option, Coordinate, FDocumentChange } from './types';

@Component({
	selector: 'bp-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	title = 'line-chart';

	cryptoCurrencyData: Coordinate [] = [];

	options: Option[] = [];

	selectedCurrency: CryptoCurrencyCode = 'BTC';

	unSubscribe: () => void = () => null;

	constructor(public firebase: FirebaseService, public cdr: ChangeDetectorRef) {
		this.getOptions();

		this.changeCryptoCurrencyData(this.selectedCurrency);
	}

	getOptions(): void {
		Object.entries(CRYPTO_CURRENCY_CODES_AND_NAMES).forEach(([ key, value ]) => {
			this.options.push({
				label: value,
				value: key,
			});
		});
	}

	selectChange(value: CryptoCurrencyCode): void {
		this.selectedCurrency = value;

		this.changeCryptoCurrencyData(value);
	}

	changeCryptoCurrencyData(value: CryptoCurrencyCode): void {
		this.cryptoCurrencyData = [];

		this.unSubscribe();

		this.unSubscribe = this.firebase.getCollection(value).limit(QUERY_LIMIT)
			.onSnapshot(snapshot => {
				const changes: FDocumentChange[] = snapshot.docChanges()
					.map(change => ({
				 		timestamp: change.doc.id,
						...change.doc.data(),
					}));

				const data = changes.map((item: FDocumentChange) => ({
					x: Number(item.timestamp),
					y: Number(item.price),
				}));

				this.cryptoCurrencyData = data;

				this.cdr.detectChanges();
			});

		this.firebase.turnOnRealtimeCryptoCurrencyPrices(value);
	}
}
