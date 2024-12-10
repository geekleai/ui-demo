import { Routes } from "@angular/router";

import { DemoComponent } from "./features/demo/demo.component";
import { ContentComponent } from "./features/demo/sections/content/components/content.component";
import { HomeComponent } from "./features/home/home.component";

export const routes: Routes = [
  { path: "home", component: HomeComponent, title: "Home" },
  { path: "demo", component: DemoComponent, title: "Demo",
    children: [
      { path: "**", component: ContentComponent }
    ]},
  { path: "", redirectTo: "/home", pathMatch: "full" }
];
