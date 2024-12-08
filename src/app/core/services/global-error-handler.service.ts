import { ErrorHandler, Injectable, isDevMode } from "@angular/core";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: Error): void {
    console.error("An unhandled error occurred:", error);

    if (isDevMode()) {
      alert(`An error occurred: ${error.message}`);
    }
  }
}
