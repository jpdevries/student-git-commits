$(function() {
    getGitHub();
    setInterval(function() {
        window.location.reload();
    }, (15 * 60000));
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
            console.log(result.data);
            postToSlack();
        }
    );
}
function getDate() {
    var date = new Date();
    var fifteen = new Date(date.getTime() - (15 * 60000)).toISOString();
    console.log(fifteen);
    return fifteen;
}
function postToSlack() {
    var request = {
       client_id: '2442078175.21239169463',
        client_secret: '72601d4bb84f530579d562d113a9acce',
        code: '21240481911.21237684213.5004b2c3f6'
    };
    makeAjaxRequest(
        'https://slack.com/api/oauth.access',
        request,
        'jsonp',
        'GET'
    );
    console.log('I want to post to Slack!');
}