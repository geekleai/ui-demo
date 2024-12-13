import { ChangeDetectionStrategy, Component } from "@angular/core";

import { InteractiveChatbotComponent } from "./chatbot.component";
import { InteractiveGraphComponent } from "./graph.component";

@Component({
  selector: "component-interactive-section",
  imports: [
    InteractiveGraphComponent,
    InteractiveChatbotComponent
  ],
  templateUrl: "./interactive-section.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InteractiveSectionComponent {

}
