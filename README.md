# GeekleAIDemo

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.4.

## Overview

GeekleAIDemo is an AI-powered code analysis companion designed to revolutionize how developers interact with their codebase. It combines advanced AI algorithms with intuitive user interfaces to provide unparalleled insights into your code.

### Key Features

1. **Code Analysis**
  - Syntax highlighting
  - Error detection
  - Performance optimization suggestions

2. **Documentation Generator**
  - Automatic comment generation
  - README creation
  - API documentation

3. **Commit History Visualization**
  - Visual diff representation
  - Commit message analysis
  - Code impact assessment

4. **AI-Powered Chatbot**
  - Natural language code queries
  - Explanation of complex algorithms
  - Suggestions for best practices
## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4222/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Technical Stack

- **Framework**: Angular 19.0.4
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome
- **State Management**: NgRx Signals
- **Markdown Rendering**: Custom implementation
- **Code Highlighting**: Custom implementation

## Project Structure

The project follows a feature-based architecture:

- [src/app/core](cci:7://file:///Users/nazar/geekle/geekle_demo/src/app/core:0:0-0:0): Core functionality and services used across the application
- [src/app/features](cci:7://file:///Users/nazar/geekle/geekle_demo/src/app/features:0:0-0:0): Feature modules (e.g., demo, integrations)
- [src/app/shared](cci:7://file:///Users/nazar/geekle/geekle_demo/src/app/shared:0:0-0:0): Shared components, directives, and pipes
- [src/assets/markdowns](cci:7://file:///Users/nazar/geekle/geekle_demo/src/assets/markdowns:0:0-0:0): Markdown files for content rendering

Key files and directories:

- [src/app/features/demo/sections/content](cci:7://file:///Users/nazar/geekle/geekle_demo/src/app/features/demo/sections/content:0:0-0:0): Components for rendering markdown content
- [src/app/features/integrations](cci:7://file:///Users/nazar/geekle/geekle_demo/src/app/features/integrations:0:0-0:0): Repository integration functionality
- [src/app/shared/modules/font-awesome](cci:7://file:///Users/nazar/geekle/geekle_demo/src/app/shared/modules/font-awesome:0:0-0:0): Font Awesome icon configuration

## Key Components

1. **MarkdownsService**: Handles fetching and processing of markdown content
2. **HeadersStore**: Manages the state of headers extracted from markdown content
3. **RepositoriesComponent**: Allows users to select repositories for integration
4. **ContentComponent**: Renders processed markdown content
5. **InteractiveSectionComponent**: Provides interactive elements alongside content

## Custom Implementations

1. **Markdown Rendering**: Custom renderer for markdown content, including syntax highlighting
2. **Header Extraction**: Custom logic to extract and process headers from markdown
3. **Interactive Graph**: Custom implementation for visualizing code structure or data

## Development Guidelines

1. Use NgRx Signals for state management where applicable
2. Follow Angular's style guide for naming conventions and file structure
3. Use Tailwind CSS for styling components
4. Implement lazy loading for feature modules to improve performance


## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
