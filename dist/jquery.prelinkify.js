(function(e){e.fn.preLinkify=function(){return this.each(function(){t(this)})};var t=function(e){if(e.nodeType===1){t.correctNode.call(this,e)}else{t.correctText.call(this,e.toString())}};t.matchRegex=new RegExp(["(",'\\s|[^a-z0-9.\\+_\\/"\\>\\-]|^',")?(?:","(","[a-z0-9\\+_\\-]+","(?:","\\.[a-z0-9\\+_\\-]+",")*@",")?(","http:\\/\\/|https:\\/\\/|ftp:\\/\\/",")?(","(?:(?:[a-z0-9][a-z0-9_%\\-_+]*\\.)+)",")(","(?:com|ca|co|edu|gov|net|org|dev|biz|cat|int|pro|tel|mil|aero|asia|coop|info|jobs|mobi|museum|name|post|travel|local|[a-z]{2})",")(","(?::\\d{1,5})",")?(","(?:","[\\/|\\?]","(?:","[\\-a-z0-9_%#*&+=~!?,;:.\\/]*",")*",")","[\\-\\/a-z0-9_%#*&+=~]","|","\\/?",")?",")(",'[^a-z0-9\\+_\\/"\\<\\-]|$',")"].join(""),"gi");t.correctNode=function(e,n){var r,i,s;r=[];s=n||document.createElement("div");i=e.firstChild;while(i){if(i.nodeType===3){while(s.firstChild){s.removeChild(s.firstChild)}s.innerHTML=t.correctText(i.textContent||i.innerText||i.nodeValue);r.push.apply(r,s.childNodes);while(s.firstChild){s.removeChild(s.firstChild)}}else if(i.nodeType===1){r.push(t.correctNode(i,s))}else{r.push(i)}i=i.nextSibling}while(e.firstChild){e.removeChild(e.firstChild)}for(var o=0;o<r.length;o++){e.appendChild(r[o])}return e};t.correctText=function(e){return e.replace(t.matchRegex,function(e,t,n,r,i,s,o,u,a){var f=[n,r,i,s,o].join("").toLowerCase();return[t,f,u,a].join("")})}})(jQuery);