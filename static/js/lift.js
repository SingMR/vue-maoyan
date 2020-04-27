import $ from 'jquery'
$(function() {
    $(".nav>div").click(function() { 
        let current = $(".city .same").eq($(this).index()).offset().top
        $("body,html").stop().animate({
            scrollTop: current
        })    
    })
    
})