(function($){
    $.fn.preLinkify = function() {
        return this.each(function() {
            PreLinkify(this)
        });
    };

    var PreLinkify = function(element) {
        if (element.nodeType === 1) {
            PreLinkify.correctNode.call(this, element);
        } else {
            PreLinkify.correctText.call(this, element.toString());
        }
    };

    PreLinkify.matchRegex = new RegExp([
        // The groups
        '(?:', //Main group
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
        ')'
    ].join(''), 'gi');

    PreLinkify.correctNode = function(node, _dummyElement) {

        var children,
            childNode,
            dummyElement;

        children = [];
        dummyElement = _dummyElement || document.createElement('div');

        childNode = node.firstChild;

        while (childNode) {
            if (childNode.nodeType === 3) {
                while (dummyElement.firstChild) {
                    dummyElement.removeChild(dummyElement.firstChild);
                }

                dummyElement.innerHTML = PreLinkify.correctText(childNode.textContent || childNode.innerText || childNode.nodeValue);

                children.push.apply(children, dummyElement.childNodes);

                while (dummyElement.firstChild) {
                    dummyElement.removeChild(dummyElement.firstChild);
                }
            } else if (childNode.nodeType === 1) {
                children.push(PreLinkify.correctNode(childNode, dummyElement));
            } else {
                children.push(childNode);
            }

            childNode = childNode.nextSibling;
        }

        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }

        for (var i = 0; i < children.length; i++) {
            node.appendChild(children[i]);
        }

        return node;
    };

    PreLinkify.correctText = function(text) {
        return text.replace(PreLinkify.matchRegex, function(match, user, protocol, domain, tld, port, query){
            var lowerCaseUrl = [
                user,
                protocol,
                domain,
                tld,
                port
            ].join('').toLowerCase();

            return [
                lowerCaseUrl,
                query
            ].join('');
        });
    };
})(jQuery);