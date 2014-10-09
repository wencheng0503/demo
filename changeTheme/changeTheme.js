$(document).ready(function(){
	$('.changTheme .theme').each(function(index, item) {
		$(item).on('click', function(){
			var val = $(item).text();
			$('#changTheme').attr('href','change'+val+'.css');
		});
	});
});