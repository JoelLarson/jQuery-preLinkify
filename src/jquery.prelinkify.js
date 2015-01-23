(function($){
    $.fn.preLinkify = function(options) {

        return this.each(function() {
            var node = $( this );

            var fixedText = preLinkify(node.text());

            node.text( fixedText );
        });

    };

    function preLinkify(input) {
        var regex = new RegExp([
            // The groups
            '(', // 1. Character before the link
            '\\s|[^a-z0-9.\\+_\\/"\\>\\-]|^',
            ')?(?:', //Main group
            '(', // 2. Email address (optional)
            '[a-z0-9\\+_\\-]+',
            '(?:',
            '\\.[a-z0-9\\+_\\-]+',
            ')*@',
            ')?(', // 3. Protocol (optional)
            'http:\\/\\/|https:\\/\\/|ftp:\\/\\/',
            ')?(', // 4. Domain & Subdomains
            '(?:(?:[a-z0-9][a-z0-9_%\\-_+]*\\.)+)',
            ')(', // 5. Top-level domain - http://en.wikipedia.org/wiki/List_of_Internet_top-level_domains
            '(?:com|ca|co|edu|gov|net|org|dev|biz|cat|int|pro|tel|mil|aero|asia|coop|info|jobs|mobi|museum|name|post|travel|local|[a-z]{2})',
            ')(', // 6. Port (optional)
            '(?::\\d{1,5})',
            ')?(', // 7. Query string (optional)
            '(?:',
            '[\\/|\\?]',
            '(?:',
            '[\\-a-z0-9_%#*&+=~!?,;:.\\/]*',
            ')*',
            ')',
            '[\\-\\/a-z0-9_%#*&+=~]',
            '|',
            '\\/?',
            ')?',
            ')(', // 7. Character after the link
            '[^a-z0-9\\+_\\/"\\<\\-]|$',
            ')'
        ].join(''), 'gi');

        return input.replace(regex, function(match, before, user, protocol, domain, tld, port, query, after){

            var lowerCaseUrl = [
                user,
                protocol,
                domain,
                tld,
                port
            ].join('').toLowerCase();

            return [
                before,
                lowerCaseUrl,
                query,
                after
            ].join('');
        });
    }
})(jQuery);