import { ChangeDetectionStrategy, Component, inject } from "@angular/core";

import { HeadersStore } from "../../../store/headers.store";

@Component({
  selector: "component-on-this-page",
  templateUrl: "./on-this-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnThisPageComponent {
  protected readonly headersStore = inject(HeadersStore);

  protected scrollToSection(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
}
