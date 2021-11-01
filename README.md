# Barking Friend Demo App

### React.js based app of dog breeds, with network requests caching, routing and proxy

### [Demo version](https://barking-friend.netlify.app)

### Uses:

- React.js for frontend implementation with Function Components and hooks
- Redux for state management
- Routing to organize and handle user navigation in the app
- Built-in browser caching mechanisms to cache network results and speed up app performance
- CSS modules for styling and scoping of styles
- JSDoc for basic type checking
- Dark mode support
- Optional proxying of all requests through custom lightweight proxy server (for POC purposes only)
- Error boundary in case of an app failure to provide feedback to the user and provide the best UX

### Key points:

- The app actively uses `Cache`, the browser interface for cache management, and all results of network requests are stored there.

- If the app needs some resource, it looks in the cache first. If the required resource has already been queried and saved, the app loads it from there, thus saving on network queries and greatly speeding up the rendering of the results.

- If the required resource does not exist in the cache, the app makes a network request to get it and then stores it in the cache for later reuse.

- The app uses navigation that is automatically generated (both the paths and the navigation menu items in the header) based on the configuration file.

- The user can search for dog breeds, the search is done on the client, without additional server requests.

- The repo includes a lightweight proxy server (with use of `Node` `HTTP(S)` modules only) which can optionally be used to proxy all API requests through itself to the destination server and return the necessary results. A client application in `Dev` environment can be automatically configured to use it by using the `npm run start:prod` command.

- The app uses components lazy loading to increase performance.
