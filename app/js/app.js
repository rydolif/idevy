'use strict';

document.addEventListener("DOMContentLoaded", function() {

	//----------------------SLIDER-hero----------------------
		var mySwiper = new Swiper('.hero__slider', {
			slidesPerView: 1,
			spaceBetween: 0,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: '.hero__pagination',
				clickable: 'true',
			},
			navigation: {
				nextEl: '.hero__button_next',
				prevEl: '.hero__button_prev',
			},
		});

	//----------------------SLIDER-magaz----------------------
		var mySwiper = new Swiper('.magaz__slider', {
			slidesPerView: 1,
			spaceBetween: 0,
			loop: true,
			pagination: {
				el: '.magaz__pagination',
				clickable: 'true',
			},
			navigation: {
				nextEl: '.magaz__button_next',
				prevEl: '.magaz__button_prev',
			},
			breakpoints: {
				576: {
					slidesPerView: 2,
				},
				767: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 4,
				},
			}
		});

	//----------------------SLIDER-action-slider----------------------
		var mySwiper = new Swiper('.action__slider', {
			slidesPerView: 1,
			spaceBetween: 0,
			spaceBetween: 15,
			pagination: {
				el: '.action__pagination',
				clickable: 'true',
			},
			navigation: {
				nextEl: '.action__button_next',
				prevEl: '.action__button_prev',
			},
			breakpoints: {
				767: {
					slidesPerView: 2,
					spaceBetween: 15,
				},
				1200: {
					slidesPerView: 2,
					spaceBetween: 50,
				},
			}
		});

	//----------------------SLIDER-category-slider----------------------
		var mySwiper = new Swiper('.category__slider', {
			slidesPerView: 1,
			spaceBetween: 0,
			spaceBetween: 15,
			pagination: {
				el: '.category__pagination',
				clickable: 'true',
			},
			navigation: {
				nextEl: '.category__button_next',
				prevEl: '.category__button_prev',
			},
		});

	//----------------------SCROLL-----------------------
		const scrollTo = (scrollTo) => {
			let list = document.querySelector(scrollTo);
			list = '.' + list.classList[0]  + ' li a[href^="#"';
	
			document.querySelectorAll(list).forEach(link => {
	
				link.addEventListener('click', function(e) {
						e.preventDefault();
						const scrollMenu = document.querySelector(scrollTo);
	
						let href = this.getAttribute('href').substring(1);
	
						const scrollTarget = document.getElementById(href);
	
						const topOffset = 70;
						const elementPosition = scrollTarget.getBoundingClientRect().top;
						const offsetPosition = elementPosition - topOffset;
	
						window.scrollBy({
								top: offsetPosition,
								behavior: 'smooth'
						});
	
						
						let button = document.querySelector('.hamburger'),
								nav = document.querySelector('.header__nav'),
								header = document.querySelector('.header');
	
						button.classList.remove('hamburger--active');
						nav.classList.remove('header__nav--active');
						header.classList.remove('header--menu');
				});
			});
		};
		// scrollTo('.header__nav');
	
	//----------------------FIXED-HEADER-----------------------
		const headerFixed = (headerFixed, headerActive) => {
			const header =  document.querySelector(headerFixed),
						active = headerActive.replace(/\./, '');
	
			window.addEventListener('scroll', function() {
				const top = pageYOffset;
				
				if (top >= 90) {
					header.classList.add(active);
				} else {
					header.classList.remove(active);
				}
	
			});
	
		};
		// headerFixed('.header', '.header--active');
	
	//----------------------HAMBURGER-----------------------
		const hamburger = (hamburgerButton, hamburgerRemove, hamburgerNav) => {
			const button = document.querySelector(hamburgerButton),
						remove = document.querySelector(hamburgerRemove),
						nav = document.querySelector(hamburgerNav);
	
			button.addEventListener('click', (e) => {
				nav.classList.add('nav--active');
			});
	
			remove.addEventListener('click', (e) => {
				nav.classList.remove('nav--active');
			});
	
		};
		hamburger('.hamburger', '.nav__hamburger','.nav');

		
	//----------------------MODAL-----------------------
		const modals = (modalSelector) => {
			const	modal = document.querySelectorAll(modalSelector);

			if (modal) {
				let i = 1;

				modal.forEach(item => {
					const wrap = item.id;
					const link = document.querySelector('.' + wrap);
					let close = item.querySelector('.close');
					if (link) {
						link.addEventListener('click', (e) => {
							if (e.target) {
								e.preventDefault();
							}
							item.classList.add('active');
						});
					}

					if (close) {
						close.addEventListener('click', () => {
							item.classList.remove('active');
						});
					}

					item.addEventListener('click', (e) => {
						if (e.target === item) {
							item.classList.remove('active');
						}
					});
				});
			}

		};
		modals('.modal');

	//----------------------FORM-----------------------
		const forms = (formsSelector) => {
			const form = document.querySelectorAll(formsSelector);
			let i = 1;
			let img = 1;
			let lebel = 1;
			let prev = 1;

			form.forEach(item => {
				const elem = 'form--' + i++;
				item.classList.add(elem);

				let formId = item.id = (elem);
				let formParent = document.querySelector('#' + formId);

				formParent.addEventListener('submit', formSend);

				async function formSend(e) {
					e.preventDefault();
			
					let error = formValidate(item);
			
					let formData = new FormData(item);

					if (error === 0) {
						item.classList.add('_sending');
						let response = await fetch('sendmail.php', {
							method: 'POST',
							body: formData
						});
			
						if (response.ok) {
							let modalThanks = document.querySelector('#modal__thanks');
							formParent.parentNode.style.display = 'none';

							modalThanks.classList.add('active');
							item.reset();
							item.classList.remove('_sending');
						} else {
							alert('Ошибка при отправке');
							item.classList.remove('_sending');
						}
			
					}
				}
			
				function formValidate(item) {
					let error = 0;
					let formReq = formParent.querySelectorAll('._req');

					for (let index = 0; index < formReq.length; index++) {
						const input = formReq[index];
			
						if (input.classList.contains('_email')) {
							if(emailTest(input)) {
								formAddErrorEmail(input);
								error++;
							}
						} else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
							formAddErrorCheck(input);
							error++;
						} else {
							if (input.value === '') {
								formAddError(input);
								error++;
							}
						}
					}
					return error;
				}

				const formImgFile = formParent.querySelectorAll('.formImgFile');

				formImgFile.forEach(item => { 
					const elem = 'formImgFile--' + i++;

					let formId = item.id = (elem);
					let formParent = document.querySelector('#' + formId);

					const formImage = formParent.querySelector('.formImage');
					const formLebel = formParent.querySelector('.formLebel');
					const formPreview = formParent.querySelector('.formPreview');

					//картинка в форме
					let formImageNumber = 'formImage--' + img++;
					let formPreviewNumber = 'formPreview--' + prev++;
					
					formImage.id = (formImageNumber);
					formLebel.htmlFor = ('formImage--' + lebel++);
					formPreview.id = (formPreviewNumber);
					const formImageAdd = document.querySelector('#' + formImageNumber);

					// изменения в инпуте файл
					formImageAdd.addEventListener('change', () =>  {
						uploadFile(formImage.files[0]);
					});

					function uploadFile(file) {
				
						if (!['image/jpeg', 'image/png', 'image/gif', 'image/ico', 'application/pdf'].includes(file.type)) {
							alert('Только изображения');
							formImage.value = '';
							return;
						}
				
						if (file.size > 2 * 1024 * 1024) {
							alert('Размер менее 2 мб.');
							return;
						}
				
						var reader = new FileReader();
						reader.onload = function (e) {
							if(['application/pdf'].includes(file.type)) {
								formPreview.innerHTML = `Файл выбран`;
							}else{
								formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
							}
							
						};
						reader.onerror = function (e) {
							alert('Ошибка');
						};
						reader.readAsDataURL(file);
					}
				})

				function formAddError(input) {
					let div = document.createElement('div');
					div.classList.add("form__error");
					div.innerHTML = "Введите данные в поле";

					input.parentElement.append(div);
					input.parentElement.classList.add('_error');
					input.classList.add('_error');
				}

				function formAddErrorEmail(input) {
					let div = document.createElement('div');
					div.classList.add("form__error");
					div.innerHTML = "Введите свою почту";

					input.parentElement.append(div);
					input.parentElement.classList.add('_error');
					input.classList.add('_error');
				}

				function formAddErrorCheck(input) {
					let div = document.createElement('div');
					div.classList.add("form__error");
					div.innerHTML = "Согласие на обработку персональных данных";

					input.parentElement.append(div);
					input.parentElement.classList.add('_error');
					input.classList.add('_error');
				}
			
				function emailTest(input) {
					return !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/. test(input.value);
				}

			});
		};
		forms('.form');

	//----------------------ADD-INPUT-----------------------
		const adminAdd = (adminAddInput) => {
			const inputAdd = document.querySelectorAll(adminAddInput);
			let i = 1;

			inputAdd.forEach(item => {
				const elem = 'admin__add--' + i++;
				item.classList.add(elem);

				let inputId = item.id = (elem);
				let inputParent = document.querySelector('#' + inputId);
				let inputButton = inputParent.querySelector('button');

				let inputDelete = inputParent.querySelector('.admin__nav_button a');

				inputButton.addEventListener('click', (e) => {
					e.preventDefault();
					let parent = document.querySelector('#' + inputId);
					let elem = inputParent.querySelector('.admin__add_elem');
					let clone = elem.cloneNode(true);
					parent.append(clone);
				});

				function myFunc(inputDelete){
					inputDelete.parentElement.parentElement.remove();
				}

			});
		};
		adminAdd('.admin__add');

});
	