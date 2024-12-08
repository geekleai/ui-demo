import { Component } from "@angular/core";

import { InteractiveComponent } from "./sections/interactive/interactive.component";
import { MainContentComponent } from "./sections/main-content/main-content.component";
import { SideMenuComponent } from "./sections/side-menu/side-menu.component";

@Component({
  selector: "component-demo",
  imports: [
    SideMenuComponent,
    MainContentComponent,
    InteractiveComponent
  ],
  templateUrl: "./demo.component.html"
})
export class DemoComponent {

}
