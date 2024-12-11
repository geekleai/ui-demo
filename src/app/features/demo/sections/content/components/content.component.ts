import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal, WritableSignal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";

import { MarkdownsService } from "../services/markdowns.service";
import { MarkdownViewerComponent } from "./markdown/markdown-viewer.component";

@Component({
  selector: "component-content",
  templateUrl: "./content.component.html",
  imports: [
    MarkdownViewerComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent implements OnInit {
  protected markdownContent: WritableSignal<string | undefined> = signal<string | undefined>(undefined);
  private readonly _route = inject(ActivatedRoute);
  private readonly _markdownsService = inject(MarkdownsService);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this._route.url.pipe(
      takeUntilDestroyed(this._destroyRef)
    ).subscribe(segments => {
      if (segments.length) {
        const segmentName = segments[segments.length - 1].path;
        this.markdownContent.set(undefined);
        this._markdownsService.get(segmentName).subscribe(markdown => {
          this.markdownContent.set(markdown);
        });
      }
    });
  }
}
