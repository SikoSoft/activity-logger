# @ss/ui

This repository comprises web components which are determined to be generic enough as to warrant existing on their own, outside of any specific application. Most of these components were originally created for use with the activity logger project, but at some point were taken out of that codebase and moved to this general purpose library.

## Tech

Lit is used for developing these native web-components, as Lit provides the best combination of coding convenience and interoperability.

All components are written in Typescript and compiled to Javascript files stored in dist/ (which are included in this repository).

Storybook is used to quickly experiment with components. Just run `npm run storybook` to spin up a Storybook server.

## Naming & file conventions

Each component should reside in a directory of its namesake, under the _src/components/_ directory. File and directory names use the kebab-casing convention, so that the names are a reflection of the HTML tag of the components.

Using the notification-provider component as an example, we see the following files:

- src/components/notification-provider/notification-provider.ts
- src/components/notification-provider/notification-provider.events.ts
- src/components/notification-provider/notification-provider.models.ts
- src/components/notification-provider/notification-provider.stories.ts

The core component logic (internal component behavior) and styling takes place in the notification-provider.ts file. The notification-provider.events.ts file contains custom events emitted by the component, while notification-provider.models.ts contains interfaces and abstract data configurations related to the component. Inside notification-provider.stories.ts are Storybook configurations, or "stories", for experimentation and demonstrating component behavior.

Not every component will contain every file. If stories have yet to be created, or it's difficult or meaningless to do so, there might not be a storybook file. Similarly, if a component does not emit custom events, there may not be an events file.
In the case of this component, there's also a whole other component folder structure within. Here, we have the following component:

- src/components/notification-provider/notification-provider/notification-message/notification-message.ts
- src/components/notification-provider/notification-provider/notification-message/notification-message.events.ts
- src/components/notification-provider/notification-provider/notification-message/notification-message.models.ts
- src/components/notification-provider/notification-provider/notification-message/notification-message.stories.ts

Most often components are always placed in the root of _src/components/_, however when they are only usable within the context of another component they will be placed within the owning components folder structure.

On a sidenote, some event related definitions remain in _src/events/_, which are placed here due to a legacy convention. These files will eventually be moved to their respective component folders.

## Defining exports

This package is configured to be of type "module" in the context of NodeJS. The build process consists only of compiling the Typescript into Javascript (meaning no additional transpiling or bundling is performed on top of Typescript compilation). The compiled files are included in this repository in the _dist/_ folder.

Additionally, package.json maintains a wide list of export paths which provide for more convenient importing of components.

## Vite

At the moment, Vite is only being used as it is necessary to have an additional build process in place to use Storybook.

In the future, Vite is likely to be more involved in the building and the project artifact, but right now it's just the Typescript compilation at play that generates the _dist/_ files (via `npm run build-tsc`)
