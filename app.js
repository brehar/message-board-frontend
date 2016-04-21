'use strict';

const PORT = process.env.PORT || 3000;

let jade = require('jade');
let http = require('http');
let fs = require('fs');
let nodeStatic = require('node-static');
let moment = require('moment');

let file = new nodeStatic.Server('./public');

var messages = [
    {
        "message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere eleifend mi id interdum. Proin eget mi neque. Phasellus placerat rutrum ultrices. Mauris tincidunt, leo id hendrerit iaculis, orci ligula blandit dui, eu tincidunt dui augue vel ante. Duis nec risus in ex iaculis luctus non a nisl. Maecenas sapien tellus, ultricies vestibulum viverra vitae, vestibulum quis nisl. Quisque consequat erat posuere aliquam pretium.",
        "name": "George Washington",
        "email": "gwashington@gmail.com",
        "image": "https://upload.wikimedia.org/wikipedia/commons/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg",
        "timestamp": "1461212394489"
    },
    {
        "message": "Quisque congue ligula in pharetra bibendum. Proin semper malesuada urna, in vulputate felis consequat eget. Donec dictum nulla ut turpis tempor, in fringilla nibh molestie. Suspendisse blandit at ante nec viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec eu ex vulputate, vehicula nulla eu, fringilla nibh. Integer auctor congue nulla eget ornare.",
        "name": "John Adams",
        "email": "jadams@gmail.com",
        "image": "http://a4.files.biography.com/image/upload/c_fit,cs_srgb,dpr_1.0,h_1200,q_80,w_1200/MTE1ODA0OTcxMjc3MzIxNzQx.jpg",
        "timestamp": "1461152311489"
    },
    {
        "message": "In eu dolor tincidunt orci lobortis lobortis non et sapien. Sed ut aliquet mauris. Donec sed est aliquet, ullamcorper massa ut, tempus urna. Suspendisse potenti. Etiam lobortis ante metus. Integer lobortis placerat consectetur. Curabitur luctus enim est, id maximus mi malesuada id. Aenean ultrices tempus vehicula.",
        "name": "Thomas Jefferson",
        "email": "tjefferson@gmail.com",
        "image": "http://a1.files.biography.com/image/upload/c_fit,cs_srgb,dpr_1.0,h_1200,q_80,w_1200/MTE5NDg0MDU1MDEwMjQ4MjA3.jpg",
        "timestamp": "1461100311489"
    },
    {
        "message": "Pellentesque at sem eu odio egestas iaculis. In posuere, mauris non ultrices vestibulum, quam mi tempus lacus, vitae bibendum orci odio sed risus. Praesent lacinia gravida purus a vestibulum. Nam eu est lacinia, laoreet nulla et, mollis nisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce commodo cursus dui in luctus. Mauris vel tellus ut nunc rutrum egestas et ut risus. Nam rhoncus nibh nisi, ut convallis tortor sodales a.",
        "name": "James Madison",
        "email": "jmadison@gmail.com",
        "image": "http://a1.files.biography.com/image/upload/c_fit,cs_srgb,dpr_1.0,h_1200,q_80,w_1200/MTE4MDAzNDEwNjEwMzI1MDA2.jpg",
        "timestamp": "1460000311489"
    }
];

http.createServer((req, res) => {
    let html;

    switch (req.url) {
        case '/':
            html = jade.renderFile('./views/index.jade', {
                indexRoute: true
            });

            res.end(html);

            break;
        case '/messages':
            var newArr = [];

            for (var message in messages) {
                var newObj = {
                    message: messages[message].message,
                    name: messages[message].name,
                    email: messages[message].email,
                    image: messages[message].image,
                    timestamp: moment(parseInt(messages[message].timestamp)).format('MMMM Do YYYY, h:mm:ss a')
                };

                newArr.push(newObj);
            }

            html = jade.renderFile('./views/messages.jade', {
                messagesRoute: true,
                messages: newArr
            });

            res.end(html);

            break;
    }

    file.serve(req, res);
}).listen(PORT, err => {
    if (err) return console.log(err);

    console.log(`Node server listening on port ${PORT}`);
});