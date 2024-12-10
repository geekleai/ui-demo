import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { MarkdownComponent } from "ngx-markdown";

@Component({
  selector: "component-markdown-viewer",
  templateUrl: "./markdown-viewer.component.html",
  imports: [
    MarkdownComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownViewerComponent {
  markdownContent = input.required<string>();
}
