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
