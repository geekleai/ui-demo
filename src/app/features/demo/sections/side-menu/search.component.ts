import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
  selector: "component-search",
  imports: [
    FaIconComponent
  ],
  templateUrl: "./search.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {

}
