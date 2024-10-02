function show_modal() {
    $('.view.active').removeClass('active');
    $('.modal').addClass('active');
    setTimeout(() => {
        $('.modal').removeClass('active');
        change_view('.view-main');
    }, 1000);
}

/**
 * Makes the heart in the footer beat
 */
function run_heartbeat() {
    return setInterval(() => {
        $('#footer-text').css('transform', 'scale(1.5)');
        setTimeout(() => {
            $('#footer-text').css('transform', 'scale(1)');
        }, 200);
    }, 1200);
}

function change_view(to) {
    const view_change_timeout = 300;

    if (to !== '.view-main') {
        $('#btn-home').css('visibility', 'visible');
    } else {
        $('#btn-home').css('visibility', 'hidden');
    }
    $('.view.active').removeClass('active');
    setTimeout(() => {
        $(to).addClass('active');
    }, view_change_timeout);
}

$(function () {
    let interval_heartbeat = run_heartbeat();

    $('#btn-add').click(function () {
        change_view('.view-add');
    });
    $('#btn-list').click(function () { 
        change_view('.view-list');
    });
    $('#form-add').submit(function (e) {
        e.preventDefault();
        show_modal();
        console.log($("#form-add").serializeArray());
    });
    $('#footer-text').hover(function () {
        clearInterval(interval_heartbeat);
        $(this).text('Создано с любовью!');
        $('.tooltip').css('visibility', 'hidden');
    }, function () {
        $(this).text('💗');
        $('.tooltip').css('visibility', 'visible');
        interval_heartbeat = run_heartbeat();
    });
    $('#btn-home').click(function (e) { 
        e.preventDefault();
        change_view('.view-main');
    });
});
