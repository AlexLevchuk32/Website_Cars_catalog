'use strict';

// Табы на странице с каталогом авто
const tabsItem = document.querySelectorAll('.tabs__btns-item');
const tabsContent = document.querySelectorAll('.tabs__content-item');

tabsItem.forEach((element) => {
	element.addEventListener('click', open);
});

function open(event) {
	const tabTarget = event.target;
	const button = tabTarget.dataset.button;

	tabsItem.forEach((item) => {
		item.classList.remove('tabs__btns--active');
	});

	tabTarget.classList.add('tabs__btns--active');

	tabsContent.forEach((item) => {
		item.classList.remove('tabs__content-item--active');
	});

	document.querySelector(`#${button}`).classList.add('tabs__content-item--active');
}

// Слайдер на главной странице
const swiper = new Swiper('.swiper', {
	pagination: {
		el: '.swiper-pagination',
	},
	autoplay: {
		delay: 3000,
		disableOnIteraction: false,
	},
	effect: 'fade',
});
