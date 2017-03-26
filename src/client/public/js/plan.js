$("outer-sidebar item").each(function () {
    $(this).css("margin-bottom", Math.ceil($(this).outerHeight() - 40) + "px", 0);
});

$("outer-sidebar item").click(function () {
    $(this).addClass("active").siblings().removeClass("active");
    var id = $(this).attr("id");
    var tab = id.substring(0, id.indexOf("-btn"));
    $("#" + tab).removeAttr("hidden").siblings().attr("hidden", "hidden");
})

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

$(".expand-sidebar-btn").click(function () {
    var $sidebar = $("sidebar");
    if ($sidebar.hasClass("active")) {
        $sidebar.removeClass("active");
        $(this).removeClass("minimize").addClass("maximize");
    }
    else {
        $sidebar.addClass("active");
        $(this).removeClass("maximize").addClass("minimize");
    }
});

$("focus-frame").width($("timeline-preview-inner").outerWidth() * 3 / 20);

$("focus-frame").draggable({
    "containment": "parent"
});

$("timeline-preview").hover(function () {
    $(this).children("cursor").fadeIn();
}, function () {
    $(this).children("cursor").fadeOut();
});

$("timeline-preview").mousemove(function (event) {
    $(this).children("cursor").css("margin-left", (event.pageX - 340) + "px");
})
