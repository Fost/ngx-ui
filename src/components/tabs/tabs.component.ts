import {
  Component, Input, Output, ContentChildren, QueryList, EventEmitter,
  ViewEncapsulation, AfterContentInit
} from '@angular/core';

import { TabComponent } from './tab.component';

@Component({
  selector: 'ngx-tabs',
  template: `
    <section>
      <ul
        class="ngx-tabs-list list-reset"
        [class.tabs-vertical]="vertical"
        [class.tabs-horizontal]="!vertical">
        <li
          *ngFor="let tab of tabs"
          class="ngx-tab"
          [class.disabled]="tab.disabled"
          [class.active]="tab.active">
          <button
            (click)="tabClicked(tab)"
            [disabled]="tab.disabled">
            {{tab.title}}
          </button>
        </li>
      </ul>
      <div class="ngx-tab-content">
        <ng-content></ng-content>
      </div>
    </section>
  `,
  host: {
    class: 'ngx-tabs'
  },
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterContentInit {

  @Input() vertical: boolean;
  @Output() select = new EventEmitter();

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  ngAfterContentInit(): void {
    const tabs = this.tabs.toArray();
    const actives = this.tabs.filter(t => { return t.active; });

    if(actives.length > 1) {
      console.error(`Multiple active tabs set 'active'`);
    } else if(!actives.length && tabs.length) {
      tabs[0].active = true;
    }
  }

  tabClicked(activeTab): void {
    const tabs = this.tabs.toArray();

    tabs.forEach(tab => tab.active = false);
    activeTab.active = true;

    this.select.emit(activeTab);
  }

}
