let clicks = 0;

document.getElementById('myButton').addEventListener('click', function() {
    document.getElementById('notification').innerHTML = 'Clicked: ' + ++clicks;
});
