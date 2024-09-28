function add() {
    console.log($("#form-add").serializeArray());
}

$(function () {
    $('#btn-add').click(function () {
        setTimeout(() => {
            $('.view-main').css({
                visibility: 'hidden',
                'z-index': 0,
            });
            $('.view-add').css({
                visibility: 'visible',
                'z-index': 1,
            });
        }, 300);
    });
    $('#form-add').submit(function (e) {
        e.preventDefault();
        add();
        setTimeout(() => {
            $('.view-add').css({
                visibility: 'hidden',
                'z-index': 0,
            });
            $('.view-main').css({
                visibility: 'visible',
                'z-index': 1,
            });
        }, 300);
    });
});
