import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { FontAwesomeRegularIconsConfigurationModule } from "./font-awesome-regular-icons-configuration.module";
import { FontAwesomeSolidIconsConfigurationModule } from "./font-awesome-solid-icons-configuration.module";

@NgModule({
  imports: [
    FontAwesomeModule,
    FontAwesomeRegularIconsConfigurationModule,
    FontAwesomeSolidIconsConfigurationModule
  ],
  exports: [FontAwesomeModule]
})
export class FontAwesomeIconLibraryModule {
}
