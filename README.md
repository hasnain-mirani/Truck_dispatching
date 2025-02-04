# Truckvise Frontend

## Downloading

To download the project, you can clone the repository using the following command:

```sh
git clone https://github.com/yourusername/truckvise-frontend.git
```

Then navigate to the project directory:

```sh
cd truckvise-frontend
```

## Installation

To install the dependencies, run the following command:

```sh
pnpm install
```

## Usage

To start the development server, use the following command:

```sh
pnpm start
```

## Features

- Development server with hot reloading
- Production build
- Code linting and formatting
- Storybook for UI component development
- End-to-end testing with Playwright
- Coupling graph generation

## Scripts

Here are the scripts available in the `package.json` file and their explanations:

- `pnpm dev`: Starts the development server with additional debugging features.
- `pnpm build`: Builds the project for production.
- `pnpm start`: Starts the production server.
- `pnpm lint`: Lints the codebase using the defined linter rules.
- `pnpm lint:fix`: Fixes linting issues in the codebase.
- `pnpm prettier`: Checks the code formatting.
- `pnpm prettier:fix`: Formats the codebase.
- `pnpm analyze`: Analyzes the bundle size.
- `pnpm storybook`: Starts the Storybook server.
- `pnpm test-storybook`: Runs tests for Storybook.
- `pnpm build-storybook`: Builds the Storybook.
- `pnpm test`: Runs the test suite.
- `pnpm e2e:headless`: Runs end-to-end tests in headless mode.
- `pnpm e2e:ui`: Runs end-to-end tests with UI.
- `pnpm format`: Formats the codebase.
- `pnpm postinstall`: Runs post-installation scripts.
- `pnpm coupling-graph`: Generates a coupling graph of the project.

To run any of these scripts, use the following command:

```sh
pnpm run <script-name>
```

For example, to run the tests, use:

```sh
pnpm run test
```