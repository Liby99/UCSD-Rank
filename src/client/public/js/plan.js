let COLLAPSED_CLASS = "collapsed";

$("category > label").click(function () {
    var $parent = $(this).parent();
    var $angle = $(this).children("i");
    var $list = $(this).siblings("list");
    if ($parent.hasClass(COLLAPSED_CLASS)) {
        $parent.removeClass(COLLAPSED_CLASS);
        $list.slideDown(200);
    }
    else {
        $parent.addClass(COLLAPSED_CLASS);
        $list.slideUp(200);
    }
});

$("requirement-tree > category > label").hover(function () {

}, function () {

});

$("#search-input").focus(function () {
    $(this).parent().parent().parent().addClass("active");
});

$("#search-input").blur(function () {
    if ($(this).val() === "") {
        $(this).parent().parent().parent().removeClass("active");
    }
});

$("expand-requirement-btn").click(function () {
    
});
