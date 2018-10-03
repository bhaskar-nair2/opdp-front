// let urls = ['192.168.1.1', '192.168.1.2', '192.168.1.3', '192.168.1.4', '192.168.1.5', '192.168.1.6'];
// let ser_name = ['Server-1', 'Server-2', 'Server-3', 'Server-4', 'Server-5', 'Server-6'];
// let status = [0, 1, 1, 0, 1, 1];
// let resource = ['10', 20, '30', 60, 0, 90];
// let stack = ['Django', 'NodeJS', 'Flask', "Pyramid", 'Ruby', 'PHP'];


function gethome() {
    $('.nav-expl a').empty().append('Home');
    $('.details').remove();
    $('.stat-container').fadeIn(400);
    $('.box-container').fadeIn(400, function () {
        $.getJSON('http://api.gameservers.ooo/container', function (full) {
            $('.ext').detach();
            let data = full.containers;
            try {
                $('#box_count h2').empty().append(data.length);
                for (let i = 0; i < data.length; i++) {
                    $('.box-container').append(
                        "<div class=\"ext box\">\n" +
                        "      <h5>ID: " + data[i].id + "</h5> \n" +
                        "            <h4>URL: <a target='_blank' href='http://" + data[i].name + ".gameservers.ooo/'>" + data[i].name + "</a></h4>\n" +
                        "            <h6>Status: <span class=\"status\" style=\"color: " + run_maker(parseInt(data[i].status), 0) + "\">" + run_maker(parseInt(data[i].status), 1) + "</span></h6>\n" +
                        // "            <h6>Resource Use: <span class=\"useage\" style=\"color:" + use_col_make(parseInt(data[i].resource)) + "\">" + data[i].resource + "%</span></h6>\n" +
                        "            <h6>Stack: " + data[i].image + "</h6>\n" +
                        "       </div>"
                    );
                }

            } catch (e) {
                $('#box_count h2').empty().append('0');
            }
        });
    });
    $('.foot').fadeIn(400);
}

$(document.body).on('click', '.ext', function (event) {
    let data = $(this).text();
    console.log(data);
    $('.stat-container').fadeOut(400);
    $('.box-container').fadeOut(400);
    $('.foot').fadeOut(400, function () {
        $('.nav-expl a').append(
            "<span>/" + data + "</span>"
        );
        $('.cont').append("" +
            " <div class=\"details\">\n" +
            "            <h4>ID: 192.168.1.0</h4>\n" +
            "            <h2>URL: Testing</h2>\n" +
            "            <h3>Name: name    </h3>\n" +
            "            <h6>Status: Static</h6>\n" +
            "            <h6>Stack: Flask</h6>\n" +
            "            <button type=\"button\" class=\"btn-danger\" onclick=\"stopCT()\">Stop</button>\n" +
            "            <button type=\"button\" class=\"btn-alert\" onclick=\"reStart()\">Restart</button>\n" +
            "        </div>");
    });
});


$('document').ready(function () {
    gethome()
});


$('#newBoxForm').submit(function (evt) {
    evt.preventDefault();
    $('.modal-cover').css({
        display: 'flex'
    });
    // let dataW =
    //     {
    //         name: $('#boxName').val(),
    //         stack: $('#boxStack').val(),
    //         git: $('#gitUrl').val()
    //     };
    // $.post('http://api.gameservers.ooo/container', data, function (res) {
    //
    // })
    $.ajax({
        url: 'http://api.gameservers.ooo/container',
        type: 'post',
        data: {
            name: $('#boxName').val(),
            stack: $('#boxStack').val(),
            git: $('#gitUrl').val()
        },
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        dataType: 'json',
        success: function (data) {
            console.info(data);
        }
    }).always(function () {
        $('.loader').fadeOut(400);
        $('.okmark').delay(450).fadeIn(400);
        $('.modal-cover').delay(2000).fadeOut(400, function () {
            $('#newBox').delay(3000).modal('hide');
        });

    });
});

//
// function use_col_make(x) {
//     if (x > 79 || x === 0)
//         return 'darkred';
//     else
//         return 'greenyellow';
// }

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



