import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApplicationConfig, ErrorHandler } from "@angular/core";
import { provideRouter, TitleStrategy } from "@angular/router";
import { provideMarkdown } from "ngx-markdown";

import { routes } from "./app.routes";
import { httpErrorInterceptor } from "./core/interceptors/http-error-inerceptor.service";
import { GlobalErrorHandler } from "./core/services/global-error-handler.service";
import { TitleService } from "./core/services/title.service";

import "prismjs";
import "prismjs/components/prism-typescript.min.js";
import "prismjs/components/prism-python.min.js";
import "prismjs/components/prism-java.min.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";

export const appConfig: ApplicationConfig = {
  providers: [provideMarkdown(),
    provideRouter(routes),
    {
      provide: TitleStrategy,
      useClass: TitleService
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideHttpClient(
      withInterceptors([httpErrorInterceptor])
    )]
};
