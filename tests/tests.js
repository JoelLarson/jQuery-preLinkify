/* global test:true */
/* global equal:true */

test("Testing preLinkify string operations", function() {

    function createParagraphNode(contents) {
        var paragraph = document.createElement("p");
        paragraph.appendChild(document.createTextNode(contents));

        return $(paragraph);
    }

    var preLinkifyTests = [
        {
            name: 'Hello test',
            input: '1',
            output: '1'
        },
        {
            name: 'Replace nothing',
            input: 'google.com',
            output: 'google.com'
        },
        {
            name: 'Replace malformatted URL',
            input: 'Google.com',
            output: 'google.com'
        },
        {
            name: 'Replace multiple malformatted URLs',
            input: 'This is an example body with google.com and Google.com as its contents.',
            output: 'This is an example body with google.com and google.com as its contents.'
        },
        {
            name: 'Replace email addresses',
            input: 'example@aol.com example@AOL.COM example@Aol.com Example@Aol.Com EXAMPLE@AOL.COM',
            output: 'example@aol.com example@aol.com example@aol.com example@aol.com example@aol.com'
        },
        {
            name: 'Regression of preLinkify with jQuery',
            input: 'This is an example body with google.com and Google.com ... example@aol.com example@AOL.COM example@Aol.com Example@Aol.Com EXAMPLE@AOL.COM as its contents.',
            output: 'This is an example body with google.com and google.com ... example@aol.com example@aol.com example@aol.com example@aol.com example@aol.com as its contents.'
        }
    ];

    for (var i = 0; i < preLinkifyTests.length; i++) {

        var $paragraph = createParagraphNode(preLinkifyTests[i].input);

        $paragraph.preLinkify();

        equal($paragraph.html(), preLinkifyTests[i].output, preLinkifyTests[i].name);
    }
});

test ( "test preLinkify with linkify", function(assert) {
    var paragraph = document.createElement("p");
    paragraph.appendChild(document.createTextNode("This is an example body with google.com and Google.com ... example@aol.com example@AOL.COM example@Aol.com Example@Aol.Com EXAMPLE@AOL.COM as its contents."));

    $(paragraph).preLinkify().linkify();

    assert.equal(
        $(paragraph).html(),
        "This is an example body with <a href=\"http://google.com\" class=\"linkified\" target=\"_blank\">google.com</a> and <a href=\"http://google.com\" class=\"linkified\" target=\"_blank\">google.com</a> ... <a href=\"mailto:example@aol.com\" class=\"linkified\" target=\"_blank\">example@aol.com</a> <a href=\"mailto:example@aol.com\" class=\"linkified\" target=\"_blank\">example@aol.com</a> <a href=\"mailto:example@aol.com\" class=\"linkified\" target=\"_blank\">example@aol.com</a> <a href=\"mailto:example@aol.com\" class=\"linkified\" target=\"_blank\">example@aol.com</a> <a href=\"mailto:example@aol.com\" class=\"linkified\" target=\"_blank\">example@aol.com</a> as its contents.",
        "Attempted preLinkify before running Linkify"
    );
});
