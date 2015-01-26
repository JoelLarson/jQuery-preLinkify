(function($){
    $.fn.preLinkify = function(options) {

        return this.each(function() {
            var node = $( this );
            var fixedText;

            if (this.nodeType === 1)
            {
                fixedText = preLinkifyNode(this);
            }
            else
            {
                fixedText = preLinkify(node.text());
                node.html( fixedText );
            }


        });

    };

    function preLinkifyNode(node, _dummyElement) {

        window.node = node;

        var children,
            childNode,
            childCount,
            dummyElement,
            i;

        children = [];
        dummyElement = _dummyElement || document.createElement('div');

        childNode = node.firstChild;
        childCount = node.childElementCount;

        while (childNode) {

            if (childNode.nodeType === 3) {

                /*
                 Cleanup dummy node. This is to make sure that
                 existing nodes don't get improperly removed
                 */
                while (dummyElement.firstChild) {
                    dummyElement.removeChild(dummyElement.firstChild);
                }

                /*
                 Linkify the text node, set the result to the
                 dummy's contents
                 */
                dummyElement.innerHTML = preLinkify(childNode.textContent || childNode.innerText || childNode.nodeValue);

                /*
                 Parse the linkified text and append it to the
                 new children
                 */
                children.push.apply(
                    children,
                    dummyElement.childNodes
                );

                // Clean up the dummy again?
                while (dummyElement.firstChild) {
                    dummyElement.removeChild(dummyElement.firstChild);
                }

            } else if (childNode.nodeType === 1) {

                // This is an HTML node, linkify it and add it
                children.push(preLinkifyNode(childNode, _dummyElement));

            } else {

                // This is some other kind of node, just push it
                children.push(childNode);
            }

            childNode = childNode.nextSibling;
        }


        // Remove all existing nodes.
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }

        // Replace with all the new nodes
        for (i = 0; i < children.length; i++) {
            node.appendChild(children[i]);
        }
        return node;
    }

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