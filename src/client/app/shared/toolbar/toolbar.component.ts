import { Component } from '@angular/core';
import {LaunchDarklyService} from "launchdarkly-angular";

/**
 * This class represents the toolbar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css']
})
export class ToolbarComponent {
  theme: string;
  _subscription: any;
  _flagName: string = 'test-branding';

  constructor(private ld: LaunchDarklyService) {
    {
      this.theme = ld.flags[this._flagName];
      this._subscription = ld.flagChange.subscribe((flags: any) => {
        if (flags[this._flagName] !== undefined) {
          console.log('setting brand: ' + flags[this._flagName])
          this.theme = flags[this._flagName];
        }
      })
    }
  }
}

