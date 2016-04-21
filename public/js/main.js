'use strict';

$(document).ready(function() {
    $('.modal-trigger').leanModal();
    $('.waves-green').click(addMessage);
});

function addMessage(event) {
    event.preventDefault();
    
    var $message = $('.hidden').clone();
    $message.removeClass('hidden');

    $message.find('img').attr('src', $('#image').val());
    $message.find('a').attr('href', 'mailto:' + $('#email').val());
    $message.find('a').text($('#name').val());
    $message.find('p.primary-content').text($('#message').val());
    $message.find('p.secondary-content').text(moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a'));

    $('.messages').prepend($message);
}