
$( document ).ready(function() {
	// prevent line-breaks in links and make open in new tab
	$('div.article_body a').not('[rel="footnote"], [rev="footnote"], [href^="#"]').html(function(i, str) {
	    return str.replace(/ /g,'&nbsp;');
	}).attr('target','_blank');

	// Give article headings direct links to anchors
	$('article h2, article h3, article h4, article h5, article h6').filter('[id]').each(function () {
	$(this).append('<a href="#' + $(this).attr("id") + '" target="_top"><i class="fa fa-link" style="display:none"></i></a>');
	});

	$('article h2, article h3, article h4, article h5, article h6').filter('[id]').hover(function () {
	$(this).find("i").toggle();
	});

	/* Sidebar height set */
	$('.sidebar').css('min-height',$(document).height());

	/* Secondary contact links */
	var scontacts = $('#contact-list-secondary');
	var contact_list = $('#contact-list');
	
	scontacts.hide();
	
	contact_list.mouseenter(function(){ scontacts.fadeIn(); });
	
	contact_list.mouseleave(function(){ scontacts.fadeOut(); });
});
