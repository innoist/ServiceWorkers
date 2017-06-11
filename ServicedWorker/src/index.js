if ('serviceWorker' in navigator) {

  navigator.serviceWorker.register('sw.js')
    .then(function (registeration) { console.log('ServiceWorker registration successful with scope: ', registeration.scope); })
    .catch(function (err) {
      console.error('There is a problem', err);
    });

}
else {
  alert('down');
}

document.getElementById('fetchData').addEventListener('click', function (e) {
  fetch('http://127.0.0.1:8888/src/albums.json', { method: 'Get' }).then(function (response) { console.log(response) })
    .catch(function (err) {
      console.log(err);
      // Error :(
    });
})