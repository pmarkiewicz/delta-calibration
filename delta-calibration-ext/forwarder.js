// forwarder.js

// forwards messages to content scripts

var tabId = null;
const Forwarder = function(appId) {
  this.appId = appId;

  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  // 	currentTab = tabs[0].id;
  // });

  this.launchApp = function() {
  	chrome.management.launchApp(appId, () => {
  		port = chrome.runtime.connect(appId);
  		port.postMessage({msg: 'hello', data: chrome.runtime.id});
  		console.log('app launched');
  	});
  };

  chrome.extension.onMessage.addListener(
    (request, sender, sendResponse) => {
      if(request.msg == "startapp") {
  			this.launchApp();
  		}
    }
  );

  chrome.runtime.onMessageExternal.addListener(
    (request, sender, sendResponse) => {
  	  console.log(request);
  	  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let tid = tabId;

        if (tabs && tabs[0] && tabs[0].id) {
          tid = tabId = tabs[0].id;
        }
    		chrome.tabs.sendMessage(tid, request, (response) => {
    		  console.log(request.msg + ' sent..');
    		});
  	  });
    }
  );
}
