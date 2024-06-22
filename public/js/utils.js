function checkCurrentUser(callback) {
    // Fetch the current user
    $.ajax({
        url: '/api/user',
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        cache: false,
    }).done(function (response) {
        callback(response);
    }).fail(function (jqXHR, statusText, error) {
        console.log(jqXHR.responseText);
        callback(null);
    });
}
