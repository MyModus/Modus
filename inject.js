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

  $(document).ready(function() {
    const win = $(window);
    const doc = $(document);
    const progressBar = $('progress');
    const progressLabel = $('.progress-label');
    const setValue = () => win.scrollTop();
    const setMax = () => doc.height() - win.height();
    const setPercent = () => Math.round(win.scrollTop() / (doc.height() - win.height()) * 100);
    
    progressLabel.text(setPercent() + '%');
    progressBar.attr({ value: setValue(), max: setMax() });
  
    doc.on('scroll', () => {
      progressLabel.text(setPercent() + '%');
      progressBar.attr({ value: setValue() });
    });
    
    win.on('resize', () => {
      progressLabel.text(setPercent() + '%');
      progressBar.attr({ value: setValue(), max: setMax() });
    })
  });

})();
