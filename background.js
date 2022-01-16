chrome.action.onClicked.addListener(function (tab) {
	chrome.tabs.executeScript(tab.ib, {
		file: 'inject.js'
	});
});

chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
		target: {tabId: tab.id},
		func: contentScriptFunc,
		args: ['action'],
	});
});

function contentScriptFunc(name) {
	Swal.fire({
		position: 'top-end',
		icon: 'success',
		title: 'Page added!',
		showConfirmButton: false,
		timer: 5000,
		backdrop: false,
		toast: true,
		customClass: {
			border: '5px solid black'
		}
	})
}

function addTask(url, time){

}

function taskDone(name) {
	Swal.fire({
		title: 'Way to go!\n Ready to move on to the next task?',
		showDenyButton: true,
		confirmButtonText: 'Yes!',
		denyButtonText: `More time.`,
		denyButtonColor: '#c9a92d',
		confirmButtonColor: 'DarkSeaGreen',
		iconHtml: '<img src="https://raw.githubusercontent.com/MyModus/Modus/master/logo.svg" style="width: 6rem">',
		width:'50%'
	}).then((result) => {
		/* Read more about isConfirmed, isDenied below */
		if (result.isDenied) {
			Swal.fire('5 minutes added.', '', 'success')
		}else{
			// Redirect here.
		}
	})
}

// This callback WILL NOT be called for "_execute_action"
chrome.commands.onCommand.addListener((command) => {
	console.log(`Command "${command}" called`);
});