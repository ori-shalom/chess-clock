import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-config-panel',
  templateUrl: './config-panel.component.html'
})
export class ConfigPanelComponent {
  @Input()
  time: NgbTimeStruct;
  constructor(public activeModal: NgbActiveModal) {}

}
