$(function () {
    $('#btn-add').click(function () {
        $('.view-main').css({
            visibility: 'hidden',
            'z-index': 0,
        });
        $('.view-add').css({
            visibility: 'visible',
            'z-index': 1,
        });
    });
});