import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomChartComponent } from './components/custom-chart/custom-chart.component';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';

@NgModule({
	declarations: [ AppComponent, CustomChartComponent, CustomSelectComponent ],
	imports: [ BrowserModule, FormsModule ],
	providers: [],
	bootstrap: [ AppComponent ],
})
export class AppModule {}
