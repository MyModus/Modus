const alarmClock = {

  onHandler : function(e) {
    const timeInSecs = document.getElementById("minutes").value * 60;
    console.log("setting a diffy for kizzi for " + timeInSecs);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, {status: "alarmStarted", timeInSeconds: timeInSecs}, () => {});
      })
    });
    chrome.alarms.create("myAlarm", {when: Date.now() + (timeInSecs * 1000)} );
    window.close();
  },

  offHandler : function(e) {
      chrome.alarms.clear("myAlarm");
              window.close();
  },

  setup: function() {
      const a = document.getElementById('alarmOn');
      a.addEventListener('click',  alarmClock.onHandler );
      // var a = document.getElementById('alarmOff');
      // a.addEventListener('click',  alarmClock.offHandler );
  }
};

document.addEventListener('DOMContentLoaded', function () {
  alarmClock.setup();
});