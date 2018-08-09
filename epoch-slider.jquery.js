/**
 * Epoch slider
 */
$(function(){
    $.fn.epoch = function( epochSlideOptions ) {
        var epochSlideSlider = [];  
        var epochSlideCurrentMousePos = { x: -1 }; 
        var epochSlideWidth = $(this).find('img').width();
        var epochSlideHeight = $(this).find('img').height();
        var epochSlideDefaults = {
            initSize : '50%',
            icon : 'move.svg', 
        }
        var epochSlideOptions = $.extend( epochSlideDefaults, epochSlideOptions); 
        var initSizeEpoch = epochSlideOptions.initSize;
        var epochSlideIcon = epochSlideOptions.icon;
        var epochSliderFullPadding = epochSlideOptions.fullPadding;
        var epochSliderBodyOverflow = epochSlideOptions.overflow;

        $(this).find('img').each(function(f, v){
            epochSlideSlider.push( $(this) );   
            $(this).remove();
        }); 
       
        $(this).append(
            '<div class="epoch-content" style="width: '+epochSlideWidth+'px; height: ' + epochSlideHeight + 'px">'+
                '<div class="epoch-old" style="background-image: url('+epochSlideSlider[0].attr('src')+');width: '+epochSlideWidth+'px; height: ' + epochSlideHeight + 'px"></div>'+
                '<div class="epoch-new" style="background-image: url('+epochSlideSlider[1].attr('src')+');width: '+initSizeEpoch+';height: ' + epochSlideHeight + 'px"></div>'+
                '<span class="epoch-dragger" style="background-image: url('+epochSlideIcon+');left: '+initSizeEpoch+';" ></span>'+
            '</div>'
        );
           
        $(".epoch-dragger").on('touchstart mousedown', function() { 
            $(this).attr("epoch-draggable-item","true");  
            if ( $(window).width() <= 768 ){
                $('body, html').css({'overflow':'hidden'});
            }

            if ( epochSliderFullPadding == 'full' ) {
                $(this).css({'padding':'100vh 100vw', 'background-size' : '1.39%'});
            }
        }).on('touchmove mousemove', function(event) { 
            if ( $(this).attr('epoch-draggable-item') == 'true' ) { 
                epochSlideCurrentMousePos.x = event.pageX - $('.epoch-new').offset().left; 
                if ( epochSlideCurrentMousePos.x <= $(this).parent().find(".epoch-old").width() && epochSlideCurrentMousePos.x >= 0 ) {
                    $(this).css({'left' : epochSlideCurrentMousePos.x + 'px' }); 
                    $(this).parent().find(".epoch-new").css({'width' : epochSlideCurrentMousePos.x + 'px' });
                }
            } 
        }).on('mouseup touchend',function() { 
            $(this).attr("epoch-draggable-item","false");
            if ( $(window).width() <= 768 ){
                $('body, html').css({'overflow':'scroll'});
            }
            if ( epochSliderFullPadding == 'full' ) {
                $(this).css({'padding':'30px 30px', 'background-size' : '30%'}); 
            }
        }).mouseleave(function(event){
            $(this).attr("epoch-draggable-item","false");  
            if ( $(window).width() <= 768 ){
            $('body, html').css({'overflow':'scroll'});
            }
            if ( epochSliderFullPadding == 'full' ) {
                $(this).css({'padding':'30px 30px', 'background-size' : '30%'}); 
            }
        }); 
    };
}( jQuery ));

 
$(function(){ 
    /**
     * epoch slider plugin
    */
    $('.epoch-slider').epoch({
        initSize : '20%',
        icon : '/STF/cms/themes/default/move.svg',
        fullPadding:'full'
    });   
  
    $('.epoch-slider2').epoch({
        initSize : '20%',
        icon : '/STF/cms/themes/default/move.svg'
    });  
});