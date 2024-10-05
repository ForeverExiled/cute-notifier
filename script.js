function clear_form_fields() {
    $('textarea[name="description"]').val('');
    $('input[name="datetime"]').val('');
}

function show_modal(type) {
    $('.view.active').removeClass('active');
    $('.modal-' + type).addClass('active');
    setTimeout(() => {
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
    $('input[name="datetime"]').attr('min', (new Date()).toISOString().substring(0, 16));

    let interval_heartbeat = run_heartbeat();

    $('#btn-add').click(function () {
        change_view('.view-add');
    });
    $('#btn-list').click(function () { 
        $.get("ajax/view.php", {
            all: 'Y',
        }).done(function (response) {
            response = JSON.parse(response);
            $('.view-list').text('').append(response);
        });
        change_view('.view-list');
    });
    $('#form-add').submit(function (e) {
        e.preventDefault();
        $.post("ajax/add.php", $("#form-add").serialize()).done(function (response) {
            show_modal(response === 'true' ? 'success' : 'failure');
        });
        clear_form_fields();
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
    $('input[name="datetime"]').on('invalid', function () {
        if ($(this).val() === '') {
            $(this).get(0).setCustomValidity('Заполни меня! (>_<)');
        } else {
            $(this).get(0).setCustomValidity('Дата и время не должны быть меньше текущих! (>_<)');
        }
    });
});
