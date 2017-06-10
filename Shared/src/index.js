

window.addEventListener("load", function () {
  var sharedWorker = new SharedWorker('./src/sharedWorker.js');
  sharedWorker.port.start();
  sharedWorker.port.addEventListener('message', function (e) {
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
      console.log('starting shared worker role');
      sharedWorker.port.postMessage({ 'command': 'start', 'number': input });
      console.log('i am working ahead of shared worker role');
    }

    else {
      alert('no input found')
    }
  })
  document.getElementById('stop').addEventListener("click", function () {
    console.log('stopping worker role')
    sharedWorker.port.postMessage({ command: 'stop' });
    document.getElementById('content').innerHTML = "worker role is stopped <br /> NO OUTPUT WILL BE DISPLAYED";
    // document.getElementById('start').style.visibility = 'hidden';

  })
})

