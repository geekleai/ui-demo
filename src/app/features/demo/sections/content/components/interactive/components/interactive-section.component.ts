import { ChangeDetectionStrategy, Component } from "@angular/core";

import { InteractiveGraphComponent } from "./graph.component";
import { OnThisPageComponent } from "./on-this-page.component";

@Component({
  selector: "component-interactive-section",
  imports: [
    InteractiveGraphComponent,
    OnThisPageComponent
  ],
  templateUrl: "./interactive-section.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InteractiveSectionComponent {

}
