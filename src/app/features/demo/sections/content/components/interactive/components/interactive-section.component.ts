import { ChangeDetectionStrategy, Component } from "@angular/core";

import { InteractiveChatbotComponent } from "./chatbot.component";
import { InteractiveGraphComponent } from "./graph.component";
import { OnThisPageComponent } from "./on-this-page.component";

@Component({
  selector: "component-interactive-section",
  imports: [
    InteractiveGraphComponent,
    InteractiveChatbotComponent,
    OnThisPageComponent
  ],
  templateUrl: "./interactive-section.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InteractiveSectionComponent {

}
