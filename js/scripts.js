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
}function getGitHub() {
    var date = getDate();
    makeAjaxRequest(
        '//api.github.com/search/repositories',
        {
            q: 'user:jstrother user:jpdevries pushed:>' + date
        },
        'jsonp',
        'GET',
        function(result) {
            console.log(result.data, 'username search');
        }
    );
}
function getDate() {
    var date = new Date();
    var fifteen = new Date(date.getTime() - (15 * 60000)).toISOString();
    console.log(fifteen);
    return fifteen;
}