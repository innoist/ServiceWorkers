window.addEventListener("load", function () {
  var wk = new Worker('./src/dedicatedWorker.js');
  wk.addEventListener('message', function (e) {
    for (var i = 0; i < e.data.length; i++) {
      document.getElementById('content').innerHTML += i.toString();
      if (i % 10 == 0) {
        document.getElementById('content').innerHTML += "<br />"
      }
    }
  })
  document.getElementById('start').addEventListener("click", function () {
    document.getElementById('content').innerHTML = "";
    var input = document.getElementById('number').value;
    if (input && input !== "") {
      console.log('starting dedicated worker role');
      wk.postMessage({ 'command': 'start', 'number': input });
      console.log('i am working ahead of worker role');
    }

    else {
      alert('no input found')
    }
  })
})

