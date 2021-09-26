import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';

import type { CryptoCurrencyCode } from '@bp/shared-models';
import { CRYPTO_CURRENCY_CODES_AND_NAMES } from '@bp/shared-models';

import { FirebaseService } from '../services';

const N = 10;

type Option = {
	label: string;
	value: string;
};
type CryptoCurrencyItem = {
	label: string;
	data: number[];
};
@Component({
	selector: 'bp-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	title = 'line-chart';

	cryptoCurrencyData: CryptoCurrencyItem[] = [];

	options: Option[] = [];

	selectedCurrency: CryptoCurrencyCode = 'BTC';

	unSubscribe: () => void = () => null;

	constructor(public firebase: FirebaseService, public cdr: ChangeDetectorRef) {
		Object.entries(CRYPTO_CURRENCY_CODES_AND_NAMES).forEach(([ key, value ]) => {
			this.options.push({
				label: value,
				value: key,
			});
		});

		this.changeCryptoCurrencyData(this.selectedCurrency);
	}

	selectChange(value: CryptoCurrencyCode): void {
		this.selectedCurrency = value;

		this.changeCryptoCurrencyData(value);
	}

	changeCryptoCurrencyData(value: CryptoCurrencyCode): void {
		this.cryptoCurrencyData = [{
			data: [],
			label: value,
		}];

		this.unSubscribe();

		this.unSubscribe = this.firebase.getCollection(value).limit(N)
			.onSnapshot(snapshot => {
				const changes = snapshot.docChanges()
					.map(change => ({
				 		timestamp: change.doc.id,
						...change.doc.data(),
					}));

				// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
				const data = changes.map((item: any) => item.price);

				this.cryptoCurrencyData = [{
					data,
					label: value,
				}];

				this.cdr.detectChanges();
			});

		this.firebase.turnOnRealtimeCryptoCurrencyPrices(value);
	}
}
