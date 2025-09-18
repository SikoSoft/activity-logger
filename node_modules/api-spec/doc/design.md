# Design documentation

This document aims to serve as both clarification of the core concepts of that guide the development of this application, as well as my own personal attempt at fleshing things out in a clear and consistent manner.

## Terminology

### List

A list is a collection of items.

This is user-generated data.

Lists may contain items of different types.

### Item

An item is an instance of an entity.

This is user-generated data.

### Entity

An entity is the first level of abstraction which defines the qualities of any item which conforms to it.

### Property

A property is any form of arbitrary, yet specific, data which describes the qualities of an item. A property is arbitrary in the sense that it is entirely relative to entity to which it belongs, yet specific in the sense that it objectively describes the characteristics of the item in which it is an instance of.

## An example use case

Considering the previously stated descriptions, an example data model which follows this form of classification could be that "Red Dead Redemption 2" (an item) is an instance of a "video-game" (an entity), which contains various properties such as "platform", "publisher" and "year of release".

## More example use cases

To expand on the example provided above, several other, more thoroughly described, sets of data will be presented in this documentation (and mock data) to highlight various use cases.

The mock/ directory contains three JSON files which describe how data could be modeled to be used for the following use cases:

1. Food journal
2. Exercise journal
3. Video-game collection
4. Vinyl record collection
5. Wine inventory
6. To-do list

## Open questions

This section goes over some remaining thoughts and concerns I still have which have yet to be understood or clearly defined.

- Does it make more sense to have render-type on the property definition, or on the instance in the item?
  Seems like it makes sense on the property config level, as property instances are currently only expected to exist on the item instance and it makes no sense to repeat so much configuration in thousands of items.

- Does the option for repeating a property make more sense on the property level, or on the instance it is defined?
  Seems like it makes sense on the property config level, as property instances are currently only expected to exist on the item instance and it makes no sense to repeat so much configuration in thousands of items.

- How to handle enum properties? (those which have a set list of possible choices)

- How to handle value by reference (so as to not need to repeatedly store same repetitive values over and over again)
