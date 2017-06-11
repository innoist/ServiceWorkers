var cacheVersion = 'v3';

self.addEventListener('install', function (e) {
  // self.skipWaiting();
  // console.log('sw installed', version);
  // Has support!

  e.waitUntil(caches.open(cacheVersion)
    .then(function (cache) {
      return cache.add(['/src/pages/brands.html']);
    })
  );
});

self.addEventListener('activate', function (e) {
  console.log('sw activate', cacheVersion);
});

function fetchAndUpdate(request) {
  return fetch(request)
    .then(function (res) {
      if (res) {
        return caches.open(cacheVersion)
          .then(function (cache) {
            return cache.put(request, res.clone())

              .then(function () {
                return res;
              });

          });
      }
    });
}

self.addEventListener('fetch', function (event) {
  console.log("Request -->", event.request.url);

  event.respondWith(caches.match(event.request)
    .then(function (res) {
      if (res)
        return res;
      if (!navigator.onLine) {
        return new Response('<h1>You are offline</h1>');
      }
      return fetchAndUpdate(event.request);
    })


  )
  // if (!navigator.onLine) {
  //   event.respondWith(new Response('<h1>You are offline</h1>'));

  // }
  // else {
  //   event.respondWith(fetch(event.request));
  // }
});