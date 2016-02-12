$(function() {
    getGitHub();
});
function makeAjaxRequest(url,request,dataType,type,done) {
    url = (typeof(url) == 'undefined') ? '//api.github.com/search/repositories' : url;
    request = (typeof(request) == 'undefined') ? {} : request;
    dataType = (typeof(dataType) == 'undefined') ? 'jsonp' : dataType;
    type = (typeof(type) == 'undefined') ? 'GET' : type;
    done = (typeof(done) == 'undefined') ? null : done;
    $.ajax({
        url:url,
        data:request,
        dataType:dataType,
        type:type
    }).done(done);
}
function getGitHub() {
    getDate();
    makeAjaxRequest(
        '//api.github.com/search/repositories',
        {
            q: 'user:jstrother user:jpdevries pushed:' + date
        },
        'jsonp',
        'GET',
        function(result) {
            console.log(result.data, 'username search');
        }
    );
}
function getDate() {
    var fifteenMinutes = new Date(new Date().getTime() - (15 * 1000 * 60));
    var year = fifteenMinutes.getFullYear();
    var month = fifteenMinutes.getMonth();
    var day = fifteenMinutes.getDate();
    var hours = fifteenMinutes.getHours();
    var minutes = fifteenMinutes.getMinutes();
    var seconds = fifteenMinutes.getSeconds();
    var date = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds;
    return date;
}