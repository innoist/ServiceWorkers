self.addEventListener('message', function (e) {
  if (e.data.command === "start") {
    var numbers = [];
    var number = e.data.number;
    console.log('number', number);
    for (var i = 0; i < number; i++) {
      numbers.push(i);
    }

    self.postMessage(numbers);
  }

  else if (e.data.command === "stop") {
    self.close();//terminates the worker role
  }
});

