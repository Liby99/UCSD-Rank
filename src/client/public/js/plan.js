$("outer-sidebar item").each(function () {
    $(this).css("margin-bottom", Math.ceil($(this).outerHeight() - 40) + "px", 0);
});

$("category > label").click(function () {
    var $parent = $(this).parent();
    var $angle = $(this).children("i");
    var $list = $(this).siblings("list");
    if ($parent.hasClass("collapsed")) {
        $parent.removeClass("collapsed");
        $list.slideDown(200);
    }
    else {
        $parent.addClass("collapsed");
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

$("#expand-requirement-btn").click(function () {
    var $sidebar = $("sidebar");
    if ($sidebar.hasClass("active")) {
        $sidebar.removeClass("active");
    }
    else {
        $sidebar.addClass("active");
    }
});

$("focus-frame").width($("timeline-preview-inner").outerWidth() * 3 / 20);

$("focus-frame").draggable({
    "containment": "parent"
});

// var dragging = false;
// var originalX = 0;
// var currentX = 0;
// var $focusFrame = $("focus-frame");
//
// $("focus-frame").mousedown(function (event) {
//     var str = $(this).css("margin-left");
//     originalX = parseInt(str.substring(0, str.indexOf("px")));
//     currentX = event.pageX;
//     dragging = true;
// });
//
// $("timeline-preview").mouseup(function () {
//     dragging = false;
// });
//
// $("timeline-preview").mousemove(function (event) {
//     if (dragging) {
//         var dx = event.pageX - currentX;
//         var nx = originalX + dx;
//         $focusFrame.css("left", nx + "px");
//     }
// });
//
$("timeline-preview").hover(function () {
    $(this).children("cursor").fadeIn();
}, function () {
    $(this).children("cursor").fadeOut();
});

$("timeline-preview").mousemove(function (event) {
    $(this).children("cursor").css("margin-left", (event.pageX - 340) + "px");
})
