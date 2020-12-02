function render_table(state) {
    // global variable
    var data;
    var state = "AL"

    $.get('/static/data/states/' + state + '_Accidents.json', function (d) {
        console.log(d)
        data = JSON.parse(d["accidents"]);
        console.log(data)
        // loop through all books
        data.books.forEach(function (b) {
            console.log(b)
            //$("#books").append(`<div><h2>${b.title}</h2><p>${b.author}</p></div>`);
        });
    });
}
render_table()

    /*

$(document).ready(function() {
    var table = $('#example').DataTable();

    $('#example tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );

    $('#button').click( function () {
        table.row('.selected').remove().draw( false );
    } );
} );
     */