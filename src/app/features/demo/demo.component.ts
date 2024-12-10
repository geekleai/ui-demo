import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { SideMenuComponent } from "./sections/side-menu/components/side-menu.component";

@Component({
  selector: "component-demo",
  imports: [
    SideMenuComponent,
    RouterOutlet
  ],
  templateUrl: "./demo.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoComponent {
}
