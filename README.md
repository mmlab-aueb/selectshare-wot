# Web of Things Gateway
## Authors
* [Iakovos Pittaras](https://www2.aueb.gr/users/pittaras/)
* [Nikos Fotiou](htttps://www2.aueb.gr/users/fotiou/)

## About
This is a Web of Things (WoT) gateway implementation that uses the W3C WoT implementation, [Eclipse Thingweb node-wot](https://www.thingweb.io), which is an official reference implementation of the WoT Interaction Model.

Our implementation can be used for interacting with Things provided by Plegma Labs and domX.
Our implementation is currently used by the [SelectShare](https://mm.aueb.gr/projects/selectshare) project.

## Prerequisites
All systems require to have:
- [NodeJS](https://nodejs.org/) version 12+
- [npm](https://npmjs.com) version 7+
To run the gateway, you need to install the node-wot library as a Node.js dependency. To install the library, you can use npm to install the node-wot packages required. 

To do so, `cd` inside the working directory and run:
```bash
npm i @node-wot/core @node-wot/binding-http --save
```
## How to use it
To run the application, from working directory execute:
```bash
node selectShareWoTGW.js
``` 
