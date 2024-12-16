import { NgModule } from "@angular/core";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faBitbucket, faGithub, faGitlab, faMicrosoft } from "@fortawesome/free-brands-svg-icons";

@NgModule()
export class FontAwesomeBrandIconsConfigurationModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faGithub,
      faGitlab,
      faBitbucket,
      faMicrosoft
    );
  }
}
