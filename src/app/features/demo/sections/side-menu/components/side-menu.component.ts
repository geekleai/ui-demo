import { NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NavigationEnd, Router } from "@angular/router";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { filter } from "rxjs";

import { SectionModel } from "../models/section.model";
import { SectionsService } from "../services/sections.service";
import { SearchComponent } from "./search.component";

interface MenuItem {
  name: string;
  children?: MenuItem[];
  expanded?: boolean;
  selected?: boolean;
  path?: string;
}

@Component({
  selector: "component-side-menu",
  imports: [
    NgClass,
    SearchComponent,
    FaIconComponent
  ],
  templateUrl: "./side-menu.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenuComponent implements OnInit {
  protected menuItems: WritableSignal<MenuItem[] | undefined> = signal<MenuItem[] | undefined>(undefined);
  private readonly _sectionsService = inject(SectionsService);
  private readonly _router = inject(Router);

  constructor() {
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe(() => {
      this.updateMenuBasedOnUrl(this._router.url);
    });
  }

  ngOnInit(): void {
    this._sectionsService.getAll().subscribe(sections => {
      const menuItems: MenuItem[] = this.buildMenuItems(sections);
      this.menuItems.set(menuItems);
      this.updateMenuBasedOnUrl(this._router.url);
    });
  }

  protected selectMenuItem(item: MenuItem): void {
    if (!item.children) {
      this._router.navigate(["/demo" + item.path]).then();
    } else {
      item.expanded = !item.expanded;
    }
    this.updateSelectedState(this.menuItems(), item);
  }

  private buildMenuItems(sections: SectionModel[], parentPath: string = ""): MenuItem[] {
    return sections.map(section => {
      const pathSegment = section.name.toLowerCase().replace(/\s+/g, "-");
      const path = `${parentPath}/${encodeURIComponent(pathSegment)}`;
      return {
        name: section.name,
        children: section.subSections ? this.buildMenuItems(section.subSections, path) : undefined,
        path: path,
        expanded: false,
        selected: false
      };
    });
  }

  private updateSelectedState(items: MenuItem[] | undefined, selectedItem: MenuItem): void {
    if (!items) {
      return;
    }

    items.forEach(item => {
      item.selected = item === selectedItem;
      if (item.children) {
        if (item === selectedItem || this.isChildSelected(item.children)) {
          item.expanded = true;
        }
        this.updateSelectedState(item.children, selectedItem);
      }
    });
  }

  private isChildSelected(children: MenuItem[]): boolean {
    return children.some(child => child.selected || (child.children && this.isChildSelected(child.children)));
  }

  private updateMenuBasedOnUrl(url: string): void {
    const pathSegments = url.split("/").filter(segment => segment !== "" && segment !== "demo")
      .map(segment => decodeURIComponent(segment));
    let currentItems = this.menuItems();
    let selectedItem: MenuItem | undefined;

    pathSegments.forEach(segment => {
      selectedItem = currentItems?.find(item => {
        const itemPathSegment = item.path?.split("/").pop() || "";
        return itemPathSegment.toLowerCase() === segment.toLowerCase();
      });
      if (selectedItem) {
        selectedItem.expanded = true;
        currentItems = selectedItem.children;
      }
    });

    if (selectedItem) {
      this.updateSelectedState(this.menuItems(), selectedItem);
    }
  }
}
