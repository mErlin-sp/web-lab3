let appended_items = []

$(document).ready(async function () {
    let $grid = $('.grid').masonry({
        // options
        itemSelector: '.grid-item',
        columnWidth: 100
    });

    while (true) {
        render_masonry($grid)
        await new Promise(r => setTimeout(r, 5000));
    }
})

function render_masonry($grid) {
    $.get("http://localhost:3000/api/database/items", function (data) {
        if (data.hasOwnProperty('error')) {
            alert("GET items error. Received message: " + data['error'])
        } else {
            let items = data['data']

            if (JSON.stringify(items) !== JSON.stringify(appended_items)) {
                appended_items = items

                $grid.html('')
                $grid.masonry({
                    // options
                    itemSelector: '.grid-item',
                    columnWidth: 100
                });

                items.forEach(function (item) {
                    let elem = getItemElement(item['width'], item['height'], item['content'])

                    $grid.append(elem)
                        // add and lay out newly appended items
                        .masonry('appended', elem);
                })
            }
        }
    });
}

// create <div class="grid-item"></div>
function getItemElement(width, height, content) {
    let elem = document.createElement('div');
    elem.className = 'grid-item'
    elem.style.width = width + 'px'
    elem.style.height = height + 'px'
    elem.innerHTML = content
    return elem;
}