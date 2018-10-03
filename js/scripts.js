// let urls = ['192.168.1.1', '192.168.1.2', '192.168.1.3', '192.168.1.4', '192.168.1.5', '192.168.1.6'];
// let ser_name = ['Server-1', 'Server-2', 'Server-3', 'Server-4', 'Server-5', 'Server-6'];
// let status = [0, 1, 1, 0, 1, 1];
// let resource = ['10', 20, '30', 60, 0, 90];
// let stack = ['Django', 'NodeJS', 'Flask', "Pyramid", 'Ruby', 'PHP'];


function gethome() {
    $('.stat-container').fadeIn(400);
    $('.box-container').fadeIn(400, function () {
        $.getJSON('http://api.gameservers.ooo/', function (data) {
            $('.ext').detach();
            for (let i = 0; i < data.length; i++) {
                $('.box-container').append(
                    "<div class=\"ext box\">\n" +
                    "            <h4>URL: " + data[i].url + "</h4>\n" +
                    "            <h3>Name:" + data[i].name + "</h3>\n" +
                    "            <h5>Status: <span class=\"status\" style=\"color: " + run_maker(parseInt(data[i].status), 0) + "\">" + run_maker(parseInt(data[i].status), 1) + "</span></h5>\n" +
                    "            <h6>Resource Use: <span class=\"useage\" style=\"color:" + use_col_make(parseInt(data[i].resource)) + "\">" + data[i].resource + "%</span></h6>\n" +
                    "            <h6>Stack: " + data[i].image + "</h6>\n" +
                    "       </div>"
                );
            }
            $('#box_count h2').empty().append(data.length);
        });
    });
    $('.foot').fadeIn(400);
}

$(document.body).on('click', '.ext' ,function (event) {
    let id = $(this).text();
    console.log(id);
    $('.stat-container').fadeOut(400);
    $('.box-container').fadeOut(400);
    $('.foot').fadeOut(400);
});


$('document').ready(function () {
    gethome()
});


$('#newBoxForm').submit(function (evt) {
    evt.preventDefault();
    $('.modal-cover').css({
        display: 'flex'
    });
    let data = $("#newBoxForm").serialize();
    $.post('http://127.0.0.1:5000/opdp/test', data, function (data) {
        if (data === '200')
            console.log('Success');

    }).always(function () {
        $('.loader').fadeOut(400);
        $('.okmark').delay(450).fadeIn(400);
        $('.modal-cover').delay(2000).fadeOut(400, function () {
            $('#newBox').delay(3000).modal('hide');
        });

    });
});


function use_col_make(x) {
    if (x > 79 || x === 0)
        return 'darkred';
    else
        return 'greenyellow';
}

function run_maker(x, y) {
    if (x === 0)
        if (y === 0)
            return 'darkred';
        else
            return 'Stopped <span class="blink">&diamondsuit;</span>';
    else {
        if (y === 0)
            return 'greenyellow';
        else
            return 'Running <span class="blink">&blacktriangleright;</span>';
    }
}

function openModal() {
    $('#newBox').modal('show')
}



