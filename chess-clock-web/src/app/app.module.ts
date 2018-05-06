import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ConfigPanelComponent } from './config-panel/config-panel.component';

// import { library, dom } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';

// library.add(fas);

// dom.watch(); // Kicks off the process of finding <i> tags and replacing with <svg>

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
