import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MarkdownComponent } from "ngx-markdown";

@Component({
  selector: "component-markdown-section",
  templateUrl: "./markdown.component.html",
  imports: [
    MarkdownComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownSectionComponent {
  @Input({ required: true }) markdownContent!: string;
}
