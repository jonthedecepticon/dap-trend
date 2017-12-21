(function (window) {


 
    $(document).ready(function () {





        /***************************\

            Page Setup

        \***************************/
        var variables = { };
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) 
        		{ variables.isMobile = true; } 
        else 	{ variables.isMobile = false; }

        if (/iPad/i.test(navigator.userAgent)) 
        		{ variables.isIpad = true }
        window.var = variables

        //
        if (!window.var.isMobile) $('.deals .deal-hover-information').css('opacity', '0'); // hides buttons on page load
        





        /***************************\

            Animations

        \***************************/

        // IMAGE HOVER

        if (!window.var.isMobile) { // hover for desktop
            $('.deals .main-display').on('mouseenter', function () {

                if ($(this).parent().hasClass('share')) $(this).children('.close-share').show();
                // img
                scaleCustom($(this).children('img'), .05, 1.2);
                slightFadeOut($(this).children('img'));
                // buttons
                fadeIn($(this).children('.deal-hover-information'));
                scaleDownEntrance($(this).children('.deal-hover-information .bottom-buttons').children('div'));
            });

            $('.deals .main-display').on('mouseleave', function () { //leave hover
                // img
                scaleCustom($(this).children('img'), .05, 1);
                slightFadeIn($(this).children('img'));
                //buttons
                $(this).children('.close-share').hide();
                fadeOut($(this).children('.deal-hover-information'));
                scaleUpExit($(this).children('.deal-hover-information .bottom-buttons').children('div'));
            });
        }




        //  FAVORITE
        $('.favorite').on('click', function () {
            $(this).children('i').replaceWith('<i class="fa fa-heart txt-pink favorite animated bounceIn">');
        })





        //  SHARE BUTTON 
        $('.share-button').on('click', function () {
            $(this).parent().parent().parent().parent().addClass('share');
            // close button
            $(this).parent().parent().siblings('.close-share').show();
            fadeOut($(this).parent());
            // share icons
            $(this).parent().siblings('.share-icons').css('bottom', '0');
         
        });





        // CLOSE SHARE
        $('.close-share').on('click', function () {
            $(this).parent().parent().removeClass('share');
            $(this).hide();
            // bottom bar actions
            fadeIn($(this).siblings('.deal-hover-information').children('.bottom-buttons'));
            $(this).siblings('.deal-hover-information').children('.share-icons').css('bottom', '-49px');
        });




        /***************************\

            Modal

        \***************************/
        $('.main-display img').on('click', function () {  // shows modal on img click
            $('.modal').modal('show');
        });

        $('.modal .leaveModal').on('click', function () { // hide video on x click
            $('.modal').modal('hide');
        });

        $('.modal').on('shown.bs.modal', function (e) {
            $('.modal-content').append(' <div class="fb-comments" data-width="100%" data-href="http://janedev.com/deal/31453/fleece-lined-leggings-regular-extended-sizes-available" data-numposts="10" data-colorscheme="light"></div>')
        });

   });

})(window);

