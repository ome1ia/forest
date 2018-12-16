var capcha = {};

$(document).ready(function(){

	makeCapcha($('#contactForm'));
	makeCapcha($('#calcForm'));

	//form sending
	$("body").on('submit', "#contactForm", function(e){

		validate($('#name'));
		validate($('#phone'));
		validate($('#mail'));

		if(!$('#contactForm .error').length && checkCapcha($(this)) ) {
			$.post('submit.php',$(this).serialize()+'&ajax=1',
			
				function(data){
					if(parseInt(data)==-1) {
						$('#lastinput').after('<span class="error">Пожалуйста, заполните обязательные поля.</span>');
					} else {
						$("#contactForm").hide('slow').after('<h4 id="contactForm_success">Спасибо!</h4> <p>Данные успешно отправлены</p>');
					}
				}
			
			);
		} else if( !checkCapcha($(this)) ) {
			makeCapcha($(this));
			$(this).find('.capcha_answ').next('.error_capcha').html('Неверное значение! Попробуйте еще раз.');
		};
		e.preventDefault();
		return false;
	});

	$("#calcForm").submit(function(e){

		validate($('#name1'));
		validate($('#phone1'));
		validate($('#mail1'));
			
		if(!$('#calcForm .error').length && checkCapcha($(this))) {
			$.post('submit.php',$(this).serialize()+'&ajax=1',
			
				function(data){
					if(parseInt(data)==-1) {
						$(this).find('.error-result').show();
					} else {
						$("#calcForm").find ('input[type=text], input[type=phone], input[type=email], textarea').each(function() {
							$(this).val('');
						});
						$('#calcForm_submit').hide();
						$('#calcForm_preSubmit').show();
						$('body').addClass('popup2-show');
					}
				}
			
			);
		} else if( !checkCapcha($(this)) ) {
			makeCapcha($(this));
			$(this).find('.capcha_answ').next('.error_capcha').html('Неверное значение! Попробуйте еще раз.');
		}
		e.preventDefault();
		return false;
	});

	$("#calcForm_preSubmit_button").on('click', function() {
		validate($('#name1'));
		validate($('#phone1'));
		validate($('#mail1'));

		if(!$('#calcForm .error').length) {
			$('#calcForm_preSubmit').hide();
			$(this).parent().prev('.error-result').hide();
			$('#calcForm_submit').show('slow');
		} else {
			$(this).parent().prev('.error-result').show();
		}
	});

	$('body').on('input', '.forminput-error', function() {
		validate($(this));
	});


	function validate(el) {
		var form = el.parents("form");

		if(el.val()) {
			el.removeClass('forminput-error')
			  .next(".error").remove();
			  if(!form.find('.error').length) {
			  	form.find('.error-result').hide();
			  }
		} else if(!el.hasClass('forminput-error')) {
			el.addClass('forminput-error')
			  .after('<span class="error"></span>');
			return use_ajax=false;
		}
	}

});

//capcha
function makeCapcha(form) {
	var capcha_id = form.attr('id');
	var capcha = form.find('.capcha');
	var a = Math.ceil(Math.random() * 10);
	var b = Math.ceil(Math.random() * 10);

	capcha.html('<span class="capcha_quest">Проверка: '+a+'+'+b+'=</span> <input type="text" name="capcha" class="capcha_answ span32" value="" placeholder="?" required /> <span class="error_capcha"></span>');
	return window.capcha[capcha_id] = a+b;
}

function checkCapcha(form) {
	var form_id = form.attr('id');
	var answ_true = capcha[form_id]+'' || '-1';
	var answ_checked = form.find('.capcha_answ').val();

	if(answ_checked != answ_true) {
		return false;
	} else {
		return true;
	}
}