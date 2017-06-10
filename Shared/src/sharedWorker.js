var ports = [];
self.addEventListener("connect", function (e) {
  var port = e.ports[0];
  ports.push(port);
  port.addEventListener("message", function (e) {
    if (e.data.command === "start") {
      var numbers = [];
      var number = e.data.number;
      console.log('number', number);
      for (var i = 0; i < number; i++) {
        numbers.push(i);
      }

      postToAllConnectedPorts(numbers);
    }

    else if (e.data.command === "stop") {
      port.close();//terminates the worker role
    }
  }, false);
  port.start();


  function postToAllConnectedPorts(numbers) {
    ports.forEach(function (element) {
      element.postMessage(numbers);
    }, this);

  }
});

