loadPage()

function loadPage() {
	const product_container = document.querySelector('.product_container');
	const total_count = document.querySelector('.total_count');
	const catolog_content = document.querySelector('body');

	if (sessionStorage.getItem('good_group') != null)
		good_group = JSON.parse(sessionStorage.getItem('good_group'));
	else
		good_group = 'all';

	document.querySelectorAll('.catolog_elem').forEach(element => {
		if (element.getAttribute('data-name') == good_group) {
			document.querySelector('.product_title').innerHTML = element.innerHTML;
		}
	});

	loadGoods(product_container, data, good_group);
	countGoods(total_count);
	choosenCatologElem(good_group);

	product_container.addEventListener("click", tuneCart);
	catolog_content.addEventListener('click', getGroup);
	window.addEventListener('load', hidePreloader);
}




function choosenCatologElem(group) {
	const catolog_elem = document.querySelectorAll('.catolog_elem');

	catolog_elem.forEach(element => {
		if (element.dataset.name == group)
			element.classList.add('choosen_catolog_elem');
		else
			element.classList.remove('choosen_catolog_elem');
	});
}


new Glide(".glide_banner", config_banner).mount();