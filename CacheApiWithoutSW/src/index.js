this.get = function (url, params, options) {
  return caches.match(url)
    .then(function (res) {
      if (res)
        return res;
      if (!navigator.onLine) {
        return new Response('<h1>You are offline</h1>');
      }
      return fetchAndUpdate(url);
    })
}


//process the request and returns an appropriatre result or throw an error
function processRequest(url, params, options) {
  return fetch(url, params).then(response => {
    return this.processResponse(response);
  }).catch(err => {

    throw (err);//returns the exception to the code for logging or any further action
  }
    )
}
//process the responsose
function processResponse(response) {
  if (response.ok) {
    //if the response is ok
    return response.json().then(data => {
      return data;
    }).catch(err => {
      //means from api it could happen result status is ok, but no result/content is returned. 
    })
  }
  else if (response.status === 401 && window.location.href.indexOf('login') < 0) {
    //general error in case of authentication, but if you are login page you don't want to get redirect to login page. instead show message

  }
  else {
    //throw the statusText as error. it can happen in case of duplicate name, or any other scnario
    throw response.statusText;
  }
}


document.getElementById('fetchData').addEventListener('click', function (e) {
  get('/src/albums.json', { method: 'Get' }).then(function (response) { console.log(response) })
    .catch(function (err) {
      console.log(err);
      // Error :(
    });
})

let cacheVersion = 'v55'
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