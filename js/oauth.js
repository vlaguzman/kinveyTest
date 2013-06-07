
document.addEventListener('deviceready', function() {
       
    Kinvey.init({
        'appKey': 'kid_eeDSAU8R6f',
        'appSecret': '04ee1d7bf8114048a7fac15f2c4188e0'
    });

    Kinvey.ping({
        success: function(response) {
            alert('Kinvey Ping Success. Kinvey Service is alive, version: ' + response.version + ', response: ' + response.kinvey);
                
        },
        error: function(error) {
            alert('Kinvey Ping Failed. Response: ' + error.description);
        }
    });

    Kinvey.OAuth.requestToken('linkedIn', {
        redirect: 'http://www.contactu.co',
        success: function(tokens) {
            // Save the oauth_token_secret, we will need it later. Only for LinkedIn and Twitter.
            window.sessionStorage.setItem('linkedIn-oauth_token_secret', tokens.oauth_token_secret);
            // Redirect the user.
            document.location.href = tokens.url;
        },
        error: function(e) {
        // Failed to request a token.
        // e holds information about the nature of the error.
            alert(e.description+ " HP en la primera");
        }
    });


}, false);

function ok(){

    var hash = document.location.hash.substring(1);
    var qs   = document.location.search.substring(1);
    var data = hash + '&' + qs;// Join together for easy processing.
    var tokens = {};
    data.split('&').forEach(function(pair) {
        var segments = pair.split('=', 2).map(decodeURIComponent);
        if(segments[0]) {// Key must be non-empty.
            tokens[segments[0]] = segments[1];
            alert("Vamos bn");
        }
    });

    Kinvey.OAuth.accessToken('linkedIn', tokens, {
        oauth_token_secret: window.sessionStorage.getItem('linkedIn-oauth_token_secret'),
        success: function(tokens) {
            alert("Oh yeah!");
            /*
            {
                "access_token": "<access-token>"
                "access_token_secret": "<access-token-secret>"
            }
            */
        },
        error: function(e) {
            alert(e.description + "Estabamos tan cerca =(");
            // Failed to obtain an access token.
            // e holds information about the nature of the error.
        }
    });
}

$('#btn-loging').click(
    function login(){

        var user = new Kinvey.User();
        user.loginWithLinkedIn({
            access_token: '<access-token>',
            access_token_secret: '<access-token-secret>',
            consumer_key: '<consumer-key>',
            consumer_secret: '<consumer-secret>'
        }, { name: 'John Doe' }, {
            success: function(user) {
                // The LinkedIn account is now linked to a Kinvey.User.
                // user.getIdentity() will return the users LinkedIn identity.
            },
            error: function(e) {
                alert(e.description + "En la malisima mi pex =(");
                // Failed to login with LinkedIn.
                // e holds information about the nature of the error.
            }
        });
        
    }
);