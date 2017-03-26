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
