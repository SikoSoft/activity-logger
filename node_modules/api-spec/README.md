# api-spec

This repository forms the basis in which [activity-logger](https://github.com/SikoSoft/activity-logger) and [user](https://github.com/SikoSoft/user) (front-end), communicate with [gapi](https://github.com/SikoSoft/gapi) (back-end).

It is in essence the contract between the front and back ends.

## What this repo contains

Generally speaking, this repository consists of interfaces or run time configurations. The majority of what is contained is either build time, or if it is run time it most likely is some default object state.

## lib

The one exception to the aforementioned background about what is contained here is the presence of a helper class, _Api_.
It can be found at _src/lib/Api.ts_, and it is provided to make it easy to make API requests, from the front-end or the back-end.

### Using Api class

The Api class needs to be instantiated as an object instance in order to be used. A configuration object containing _authToken_, _baseUrl_ and _errorHandler_ should be provided on creation.

`const api = new Api({ authToken: "xxx", baseUrl: "https://api.example.com", errorHandler: () => { console.log("Something went wrong")}});`

Once an instance of the Api class is created, helper methods can be called to perform standard HTTP requests. Currently, four methods are supported:

- api.get(endpointUrl)
- api.post(endpointUrl, payload)
- api.put(endpointUrl, payload)
- api.delete(endpointUrl)

All methods require _endpointUrl_ (string), while post and put need an additional _payload_ (object) argument.
All of these methods are async, and as such should be awaited. The response for all of these methods is a result type containing the response code as _status_ and response body as _response_. In the event of "connection refused", failed handshake or similar request failure in which no status code is given, _null_ is returned.

## models

This is where the majority of the code in this repository resides. Interfaces are generally structured by feature. The following is a brief overview of the various files.

### Asset (DRAFT)

While this actually is one of the oldest files, as of yet it remains to be used. It is a high level abstraction of where data modeling in the activity-logger is heading. In the future, "actions" will be abstracted into the concept of "assets" (possibly "entities" instead; naming is unclear at the moment). These assets will contain customizable and arbitrary properties (of varying types), which can then be used to form lists or collections of said assets.

### List

Contains variety of interfaces related to list configurations. A list configuration is a set configuration of rules that define how a list (or collection of assets/items/actions) should be structured. This includes various forms of filtering and sorting.

### Operation

The models in Operation are related to performing mass operations on items. The interfaces here describe what operations are available, and what the expected payload is to perform them.

### Property (DRAFT)

Similar to the Asset models, the Property models are currently a work in progress and yet to be used. They are currently being defined to iron out the relationships they might have and how configurable they will be.

### Setting

Everything in Setting defines various features that can be disabled, enabled or configured in a specifc manner. At the moment, all the settings used are for activity-logger. Settings exist in various forms with different data types in how they are saved, and control types in how they are managed.

Worth noting is that the current convention is to use the same naming of control types as those in Storybook (only far fewer are being used here).
