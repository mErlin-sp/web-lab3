const express = require('express');
const router = express.Router();

const lorem_ipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend, orci in vehicula iaculis, nisl\n' +
    '        ligula convallis massa, at venenatis lorem tortor at libero. Vivamus suscipit auctor felis, ac bibendum\n' +
    '        magna venenatis tempor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos\n' +
    '        himenaeos. Nulla tempor lacinia ipsum ut faucibus. Suspendisse placerat et mi eu euismod. Donec non\n' +
    '        scelerisque enim. Donec dictum ullamcorper est non egestas. Aliquam eu quam vel ex lobortis egestas at non\n' +
    '        est. Sed mi nibh, eleifend a tempus id, mattis at turpis. Fusce mi erat, aliquet quis urna ac, tempor\n' +
    '        fermentum odio. Sed vel vulputate dolor. Morbi dolor lorem, aliquam at accumsan et, varius ac turpis. Aenean\n' +
    '        tristique id augue sed tempor. Maecenas vitae semper est.'

/* GET home page. */
router.get('/', function (req, res, next) {
    const data = {
        title: 'Лабораторана робота 3',
        lorem_ipsum: lorem_ipsum
    }
    res.render('index', data);
});

router.get('/render', function (req, res, next) {
    const data = {
        title: 'Masonry renderer',
        lorem_ipsum: lorem_ipsum
    }
    res.render('render', data);
});

module.exports = router;
