$( document ).ready(function() {

	/* Sidebar height set */
	$('.sidebar').css('min-height',$(document).height());

	/* Secondary contact links */
	var scontacts = $('#contact-list-secondary');
	var contact_list = $('#contact-list');
	
	scontacts.hide();
	
	contact_list.mouseenter(function(){ scontacts.fadeIn(); });
	
	contact_list.mouseleave(function(){ scontacts.fadeOut(); });

	// prevent line-breaks in links and make open in new tab
	$('div.article_body a').not('[rel="footnote"], [rev="footnote"]').html(function(i, str) {
	    return str.replace(/ /g,'&nbsp;');
	}).attr('target','_blank');

});
