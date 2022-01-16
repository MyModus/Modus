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
		title: 'Something went wrong!',
		showConfirmButton: false,
		timer: 5000,
		backdrop: false,
		toast: true,
		customClass: {
			border: '5px solid black'
		}
	})
}

// This callback WILL NOT be called for "_execute_action"
chrome.commands.onCommand.addListener((command) => {
	console.log(`Command "${command}" called`);
});