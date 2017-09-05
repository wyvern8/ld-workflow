import { Component, OnInit } from '@angular/core';
import { NameListService } from '../shared/name-list/name-list.service';
import { LaunchDarklyService } from 'launchdarkly-angular';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {

  newName: string = '';
  errorMessage: string;
  names: any[] = [];
  show: boolean;
  _subscription: any;
  _flagName: string = 'test-app-add-enabled';

  /**
   * Creates an instance of the HomeComponent with the injected.
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService
   */
  constructor(public nameListService: NameListService,
              private ld: LaunchDarklyService) {
    this.show = ld.flags[this._flagName];
    this._subscription = ld.flagChange.subscribe((flags: any) => {
      if (flags[this._flagName] !== undefined) {
        this.show = flags[this._flagName];
      }
    });
  }

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.getNames();
  }

  /**
   * Handle the nameListService observable
   */
  getNames() {
    this.nameListService.get()
      .subscribe(
        names => this.names = names,
        error => this.errorMessage = <any>error
      );
  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    // TODO: implement nameListService.post
    this.names.push(this.newName);
    this.newName = '';
    return false;
  }

}
