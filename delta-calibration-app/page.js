// page.js
document.querySelector('#test_button').addEventListener('click', function() {
  chrome.runtime.sendMessage({msg: 'TEST'});
});

chrome.runtime.onMessage.addListener( (msg) => {
  if (msg.msg === 'log') {
    var buffer = document.querySelector('#buffer');
    buffer.innerHTML += msg.data + '<br/>';
  }
});
