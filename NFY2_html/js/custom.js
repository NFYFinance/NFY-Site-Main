function menu_open() { 
    jQuery("#nav-icon").toggleClass('open'); 
    jQuery(".left_menu_wrap").toggleClass('open'); 
    jQuery("html").toggleClass('menu_is_open'); 
} 

jQuery(document).ready(function() {
  jQuery('.hero_banner').slick({
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    //autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    pauseOnHover:false
  });


jQuery('.teste_scroll').slick({
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    //autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
    responsive: [
            
        {
            breakpoint: 993,
            settings: {
                arrows:false
            }
        }
    ]
});

});
       


/*wow = new WOW(
	{
		boxClass: 'wow',
		offset: 100,
		mobile: true,
		live: true
	}
)
wow.init();*/



jQuery("document").ready(function() {

	//if(jQuery(window).width() > 991)  {

		jQuery(window).scroll(function() {
			if (jQuery(this).scrollTop() > 300) {
				jQuery('.menu-container').addClass("hdr_fix")
                jQuery('header').addClass("header-is-fixed")
                jQuery('body').addClass("header-body-fixed")
			} else {
				jQuery('.menu-container').removeClass("hdr_fix")
                jQuery('body').removeClass("header-body-fixed")
			}
		})

	//}
});

