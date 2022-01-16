(function() {

    const progressWrapper = document.createElement('div');
    progressWrapper.className = 'progress-wrapper';

    const progressLabel = document.createElement('div');
    progressLabel.className = 'progress-label';
    const progressElement = document.createElement('progress');

    progressWrapper.style.position = 'fixed';
    progressWrapper.style.top = 0;
    // progressWrapper.style.right = 0;
    // // progressWrapper.textContent = 'Injected!';
    progressWrapper.style.zIndex = 10000;

    progressWrapper.appendChild(progressLabel);
    progressWrapper.appendChild(progressElement);

    document.getElementsByTagName('html')[0].prepend(progressWrapper);
    // chrome.alarms.create('rao2', {delayInMinutes: 0.1});

    const interval = null;

    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        console.log(request.status);

        if (request.status == "alarmStarted") {
          let start = Date.now();
          const timeOut = request.timeInSeconds * 1000;
          const progressBar = $('progress');
          const progressLabel = $('.progress-label');

          if (interval === null) {
            interval = setInterval(() => {
              const diffy = Date.now() - start;
              const percentageLeft = Math.trunc(Math.floor(diffy / 1000) / request.timeInSeconds * 100); 
              progressLabel.text(percentageLeft + '%');
              progressBar.attr({ value: percentageLeft, max: 100 });
            }, 1000);
  
          setTimeout(() => { 
            const progressBar = $('progress');
            const progressLabel = $('.progress-label');
            progressLabel.text(0 + '%');
            progressBar.attr({ value: 0, max: 100 });
  
            clearInterval(interval)
          }, timeOut + 500);
          }

        } else if (request.status == "alarmEnded") {
          Swal.fire({
            title: 'Way to go!\n Ready to move on to the next task?',
            showDenyButton: true,
            confirmButtonText: 'Yes!',
            denyButtonText: `More time.`,
            denyButtonColor: '#c9a92d',
            iconHtml: '<img src="https://raw.githubusercontent.com/MyModus/Modus/master/logo.svg">'
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isDenied) {
              Swal.fire('5 minutes added.', '', 'success')
            }
          })

          chrome.storage.local.get(['alarms', 'totalTime'], function(alarms) {
            alarms = alarms.alarms;
            console.log(alarms);
            if (alarms == null) {
              alarms = [];
            } else {
              alarms = JSON.parse(alarms);
            }
            renderTasks(alarms);

            alarms.some(alarm => {
              const a = new Date(); // Current date now.
              const d = parseInt((b-a)/60000);

              if (d > 0) {
                let start = Date.now();
                const progressBar = $('progress');
                const progressLabel = $('.progress-label');
                
                const interval = setInterval(() => {
                  const diffy = Date.now() - start;
                  const percentageLeft = Math.trunc(Math.floor(diffy / 1000) / alarm.mins); 
                  progressLabel.text(percentageLeft + '%');
                  progressBar.attr({ value: percentageLeft, max: 100 });
                }, 1000);
      
              setTimeout(() => { 
                const progressBar = $('progress');
                const progressLabel = $('.progress-label');
                progressLabel.text(0 + '%');
                progressBar.attr({ value: 0, max: 100 });
      
                clearInterval(interval)
              }, timeOut + 500);
                return true;
              }
              return false;
            })
            
          });
        }
      }
    );

})();