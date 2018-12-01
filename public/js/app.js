const addCode = function(event) {
    event.preventDefault();
    $('#response').empty();
    $.get(`/api/search`, function(data){
        $('#response').text(data.excerpt);
    })
}

$('#response').on('click', function(){
    $('#response').addClass('active');
});

$('#response').on('click', addCode);