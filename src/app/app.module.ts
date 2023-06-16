import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
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
import { createCustomElement } from '@angular/elements';
import { CauseComponent } from './chart/nodes/cause/cause.component';
import { ConsequencesComponent } from './chart/nodes/consequences/consequences.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    CardComponent,
    RiskNodeComponent,
    ControlNodeComponent,
    CauseComponent,
    ConsequencesComponent,
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
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector){}

  ngDoBootstrap(appRef: ApplicationRef): void {
     const element = createCustomElement(AppComponent, {
        injector: this.injector,
      });
      customElements.define('bow-tie-element', element);
  }
}
