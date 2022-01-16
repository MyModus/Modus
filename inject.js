(function() {

	const div = document.createElement('div');
	div.style.position = 'fixed';
	div.style.top = 0;
	div.style.right = 0;
	div.textContent = 'Injected!';
  div.style.zIndex = 10000;
	document.body.appendChild(div);

	alert('rao!!!');
})();
