const getHostnameFromRegex = (url) => {
	// run against regex
	const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
	// extract hostname (will be null if no match is found)
	return matches && matches[1];
}



function renderTasks(tasklist) {
	document.getElementById("tasks").innerHTML = "";
	for(i = 0; i<tasklist.length; i++){
		var a = new Date(); // Current date now.
		var b = tasklist[i].time
		var d = parseInt((b-a)/60000);
    if (d > 0) {
      document.getElementById("tasks").innerHTML +=
			"  <div class=\"row py-3\">\n" +
			"    <div class=\"col text-center\">\n" +
			"      <img id=\"icon-"+i+"\" width='23px' src=\"http://"+getHostnameFromRegex(tasklist[i].url) + "/favicon.ico"+"\">\n" +
			"    </div>\n" +
			"    <div class=\"col text-center\">\n" +
			"      <span id=\"path-"+i+"\">"+tasklist[i].url+"</span>\n" +
			"    </div>\n" +
			"    <div class=\"col text-center\">\n" +
			"      <span id=\"time-"+i+"\">"+d+"m</span>\n" +
			"    </div>\n" +
			"  </div>\n"
	}
    }
}


const alarmClock = {
  onHandler : function(e) {
    const timeInSecs = document.getElementById("minutes").value * 60;
    console.log("setting a diffy for kizzi for " + timeInSecs);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, {status: "alarmStarted", timeInSeconds: timeInSecs}, () => {});
      })
    });
    chrome.alarms.create(Date.now().toString(), {when: Date.now() + (timeInSecs * 1000)} );
    
    chrome.storage.local.get(['alarms', 'totalTime'], function(alarms) {
      alarms = alarms.alarms;
      console.log(alarms);
      if (alarms == null) {
        alarms = [];
      } else {
        alarms = JSON.parse(alarms);
      }

      console.log('About to set ' + alarms);
      const obj = {url: document.getElementById('url').value, time: Date.now() + (timeInSecs * 1000), mins: timeInSecs / 60};
      alarms.push(obj);

      chrome.storage.local.set({'alarms': JSON.stringify(alarms), 'totalTime': alarms.totalTime + timeInSecs}, () => window.close());
      renderTasks(alarms);
    });

    // const alarms = localStorage.getItem("alarms");

    // localStorage.setItem('alarms', JSON.stringify(alarms));

    
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
          
    chrome.storage.local.get(['alarms', 'totalTime'], function(alarms) {
      alarms = alarms.alarms;
      console.log(alarms);
      if (alarms == null) {
        alarms = [];
      } else {
        alarms = JSON.parse(alarms);
      }
      renderTasks(alarms);
    });
  }
};

document.addEventListener('DOMContentLoaded', function () {
  alarmClock.setup();
});