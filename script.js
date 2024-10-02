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

function add() {
    console.log($("#form-add").serializeArray());
    $('button.input-add').click(() => {
        $('main').append('<div id="modal-success" class="view"><span class="pacifico-regular">Успешно!</span></div>');
    });
    setTimeout(() => {
        $('#modal-success').remove();
    }, 1000);
}

function change_view(from, to) {
    const view_change_timeout = 300;
    if (to !== '.view-main') {
        $('#btn-home').css('visibility', 'visible');
    } else {
        $('#btn-home').css('visibility', 'hidden');
    }
    $(from).removeClass('active');
    setTimeout(() => {
        $(to).addClass('active');
    }, view_change_timeout);
}

$(function () {
    let interval_heartbeat = run_heartbeat();

    $('#btn-add').click(function () {
        change_view('.view-main', '.view-add');
    });
    $('#btn-list').click(function () { 
        change_view('.view-main', '.view-list');
    });
    $('#form-add').submit(function (e) {
        e.preventDefault();
        add();
        change_view('.view-add', '.view-main');
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
});
