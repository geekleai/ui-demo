import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
  WritableSignal
} from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { debounceTime, distinctUntilChanged } from "rxjs";

import { SectionModel } from "../models/section.model";

interface SearchResult {
  name: string;
  parentName: string;
}

@Component({
  selector: "component-search",
  imports: [
    FaIconComponent,
    ReactiveFormsModule
  ],
  templateUrl: "./search.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  readonly sections = input.required<SectionModel[]>();
  protected searchControl = new FormControl("", { nonNullable: true });
  protected searchResults: WritableSignal<SearchResult[]> = signal([]);
  protected showDropdown = computed(() => this.searchResults().length > 0);
  private readonly _router = inject(Router);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => this.searchResults.set(searchTerm ? this.performSearch(searchTerm) : []));
  }

  protected groupedResults = computed(() => {
    const results = this.searchResults();
    const grouped: { [parentName: string]: SearchResult[] } = {};

    results.forEach((result) => {
      const parentName = result.parentName || "";
      if (!grouped[parentName]) {
        grouped[parentName] = [];
      }
      grouped[parentName].push(result);
    });

    return Object.keys(grouped).map((parentName) => ({
      parentName,
      items: grouped[parentName]
    }));
  });

  protected highlightMatch(text: string, searchTerm: string): string {
    if (!searchTerm) {
      return text;
    }
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, "<span class=\"bg-yellow-200\">$1</span>");
  }

  protected onResultClick(result: SearchResult): void {
    const path = `demo/${encodeURIComponent(result.parentName)}/${encodeURIComponent(result.name)}`.replace(" ", "-");
    this._router.navigate([path]);
    this.searchControl.setValue("");
  }

  private performSearch(searchTerm: string): SearchResult[] {
    const results: SearchResult[] = [];
    const lowercaseSearchTerm = searchTerm.toLowerCase();

    this.sections().forEach(section => {
      if (section.name.toLowerCase().includes(lowercaseSearchTerm)) {
        results.push({
          name: section.name,
          parentName: "" // Top-level sections don't have a parent
        });
      }

      section.subSections?.forEach(subSection => {
        if (subSection.name.toLowerCase().includes(lowercaseSearchTerm)) {
          results.push({
            name: subSection.name,
            parentName: section.name
          });
        }
      });
    });

    return results;
  }
}
