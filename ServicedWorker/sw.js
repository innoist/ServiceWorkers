var version = 4;

self.addEventListener('install', function (e) {
  self.skipWaiting();
  console.log('sw installed', version);

});

self.addEventListener('activate', function (e) {
  console.log('sw activate', version);
});



self.addEventListener('fetch', function (event) {
  console.log("Request -->", event.request.url);

});