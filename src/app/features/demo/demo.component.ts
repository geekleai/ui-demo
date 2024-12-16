import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { InteractiveChatbotComponent } from "./sections/content/components/interactive/components/chatbot.component";
import { SideMenuComponent } from "./sections/side-menu/components/side-menu.component";

@Component({
  selector: "component-demo",
  imports: [
    SideMenuComponent,
    RouterOutlet,
    InteractiveChatbotComponent
  ],
  templateUrl: "./demo.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoComponent {
}
