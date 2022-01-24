$(document).ready(function () {
    update_table()

    $("#add_button").click(function () {
        $.post("http://localhost:3000/api/database/add-item",
            {
                width: $("#item_width").val(),
                height: $("#item_height").val(),
                content: $('#item_content').val()
            },
            function (data) {
                if (data.hasOwnProperty('error')) {
                    alert("Get add item error. Received message: " + data['error']);
                } else {
                    update_table()
                }
            });
    });

    $('#clear_button').click(function () {
        $.get("http://localhost:3000/api/database/clear", function (data) {
            if (data.hasOwnProperty('error')) {
                alert("GET clear error. Received message: " + data['error'])
            } else {
                update_table()
            }
        })
    })
});

function update_table() {
    $.get("http://localhost:3000/api/database/items", function (data) {
        if (data.hasOwnProperty('error')) {
            alert("GET items error. Received message: " + data['error'])
        } else {
            let items = data['data']

            let table = '<tr><th>Item index</th><th>Item width</th><th>Item height</th><th>Item content</th></tr>'
            for (let i = 0; i < items.length; i++) {
                let item = items[i]
                table += `<tr><td>${i + 1}</td><td>${item['width']}</td><td>${item['height']}</td><td>${item['content']}</td></tr>`
            }
            $("#items-table").html(table)
        }
    });
}