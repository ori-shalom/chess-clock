import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ConfigPanelComponent } from './config-panel/config-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfigPanelComponent
  ],
  imports: [
    NgbModule.forRoot(),
    FormsModule,
    BrowserModule
  ],
  providers: [],
  entryComponents: [ConfigPanelComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
