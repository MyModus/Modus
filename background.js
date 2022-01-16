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
		title: 'Error!',
		text: 'Do you want to continue',
		icon: 'error',
		confirmButtonText: 'Cool'
	})
}

// This callback WILL NOT be called for "_execute_action"
chrome.commands.onCommand.addListener((command) => {
	console.log(`Command "${command}" called`);
});