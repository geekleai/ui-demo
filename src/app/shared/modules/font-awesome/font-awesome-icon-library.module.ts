import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { FontAwesomeBrandIconsConfigurationModule } from "./font-awesome-brand-icons-configuration.module";
import { FontAwesomeRegularIconsConfigurationModule } from "./font-awesome-regular-icons-configuration.module";
import { FontAwesomeSolidIconsConfigurationModule } from "./font-awesome-solid-icons-configuration.module";

@NgModule({
  imports: [
    FontAwesomeModule,
    FontAwesomeRegularIconsConfigurationModule,
    FontAwesomeSolidIconsConfigurationModule,
    FontAwesomeBrandIconsConfigurationModule
  ],
  exports: [FontAwesomeModule]
})
export class FontAwesomeIconLibraryModule {
}
