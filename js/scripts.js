let urls = ['192.168.1.1', '192.168.1.2', '192.168.1.3', '192.168.1.4', '192.168.1.5', '192.168.1.6'];
let ser_name = ['Server-1', 'Server-2', 'Server-3', 'Server-4', 'Server-5', 'Server-6'];
let status = [0, 1, 1, 0, 1, 1];
let resource = ['10', 20, '30', 60, 0, 90];
let stack = ['DJango','NodeJS','Flask',"Pyramid",'Ruby','PHP'];

for (let i = 0; i < urls.length; i++) {
    $('.box-container').append(
        "<div class=\"ext box\">\n" +
        "            <h4>URL: " + urls[i] + "</h4>\n" +
        "            <h3>Name: Server 1</h3>\n" +
        "            <h6>Status: <span class=\"status\" style=\"color: " + run_maker(parseInt(status[i]), 0) + "\">" + run_maker(parseInt(status[i]), 1) + "</span></h6>\n" +
        "            <h6>Resource Use: <span class=\"useage\" style=\"color:" + use_col_make(parseInt(resource[i])) + "\">" + resource[i] + "</span></h6>\n" +
        "            <h6>Stack: "+stack[i]+"</h6>\n" +
        "        </div>"
    );
}

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
            return 'Stopped';
    else {
        if (y === 0)
            return 'greenyellow';
        else
            return 'Running';
    }
}
