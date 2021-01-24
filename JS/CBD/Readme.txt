Characteristics of a Good Component Design:

1- should be instantiateable
2- should be modular and re-usable
3- should not have coupling with other dependencies; if super needed, inject dependencies
4- divided as many functions as needed to look cleaner
5- should be flexible enough to be customized with  properties and functions
6- should be able to manage its state; it can optionally persist its state in a session storage
7- should have much-needed life-cycle functions; like init, render, beforeRender, afterRender, destroy
8- must have a function to clean/destroy its state and elements from dom
9- components composed of 1 or two elements can dynamically createElement's to append the final UI in target parent node
but those made up of complex markup should have inline html with templating to parse and generate its markup with model data
10- a composite components (i.e. which are made up of different types of child componetns) should have handling functions to fulfil their functionality

