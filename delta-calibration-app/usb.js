console.log('usb.js');

// ---- usb
chrome.usb.onDeviceAdded.addListener(function(dev) {
	console.log(dev);
});

chrome.usb.onDeviceRemoved.addListener(function(dev) {
	console.log(dev);
});

function onDeviceFound(devices) {
  this.devices=devices;
  if (devices) {
    if (devices.length > 0) {
      console.log("Device(s) found: "+devices.length);
	  console.log(devices[0]);
    } else {
      console.log("Device could not be found");
    }
  } else {
    console.log("Permission denied.");
  }
// ----
}
