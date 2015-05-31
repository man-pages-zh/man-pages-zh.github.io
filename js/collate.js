$(document).ready(function() {
    var docName = document.location.pathname.match(/[^\/]+$/)[0];

    $('body').prepend('<div id="raw" hidden></div>');
    var raw = $("#raw");

    raw.load("../man1-raw/" + docName, function(response, status, xhr) {
        if (status === "error") {
            console.log("error loading English man page.");
        }
        else {
            console.log(docName);
            addTooltip();
        }
    });
    function addTooltip() {
        var pre = $("#raw pre");

        var name = pre.slice(1, 2).html();

        var description = [];
        // description of English man page
        pre.slice(3, 4).contents().filter(function() {
            if (this.nodeType === 3) {
                var itemTxt = $(this)
                    .text()
                    .replace(/^[\s]+/, '')
                    .replace(/[\n\t]+/gm, '');
                if (itemTxt.length > 2) {
                    description.push(itemTxt);
                }
            }
        });

        // add tooltip to NAME
        $(".content:first")
            .attr('title', 'More')
            .wrap('<a href="#" class="tooltip" title="' + name + '"></a>');

        // add tooltip to other DESCRIPTION
        $("dl:first dd").each(function (i) {
            $(this).attr('title', 'More');
            $(this).wrap('<a href="#" class="tooltip" title="' + description[i+1] + '"></a>');
        });
    }

});