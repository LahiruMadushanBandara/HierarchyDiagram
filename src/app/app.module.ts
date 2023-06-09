import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import '@progress/kendo-ui';
import { CardComponent } from './card/card.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RiskNodeComponent } from './chart/nodes/risk/risk-node.component';
import { ControlNodeComponent } from './chart/nodes/control/control-node.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,

    CardComponent,
    RiskNodeComponent,
    ControlNodeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
