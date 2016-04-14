var buttonEl = document.getElementById('runButton');
buttonEl.addEventListener('click', function() {
    // Asynchronously load the "./add" and "jquery" modules, as well
    // as the "style.less" file:
    require('lasso-loader').async(
        ['style.less'],
        function() {
            // Everything that is required within this function will be
            // asynchronously downloaded. Any additional dependencies passed
            // in using the first argument to the async method will also
            // be asynchronously downloaded. Whenever thing has been loaded
            // by the web broweer the following code will run. If all of
            // the dependencies have already been downloaded then the function
            // will be invoked immediately.
            var add = require('./add');
            var jquery = require('jquery');

            var now = new Date().toString();
            var html = '2+2=' + add(2, 2) + ' (' + now + ')';

            jquery('#target').html(html);
        });
});
