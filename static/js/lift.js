import $ from 'jquery'
function lift() {
    $(function() {
        $(".nav").on('click','div',function() {     
            let current = $(".same").eq($(this).index()).offset().top      
            $("body,html").stop().animate({
                scrollTop: current
            })    
        })   
    })
}

export {
    lift 
}