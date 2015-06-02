$(document).ready(function() {
    var docName = document.location.pathname.slice(0);

    $('body').append('<div id="raw" hidden></div>');
    var raw = $("#raw");

    if (docName.slice(1, 4) == "raw")
        var shuffle = "man" + docName.slice(4)
    else
        var shuffle = "raw" + docName.slice(4)

    raw.load("../" + shuffle + " #main", function(response, status, xhr) {
        if (status === "error") {
            console.log("error loading English man page.");
        }
        else {
            addTooltip();
        }
    });
    function addTooltip() {
        var name = $("#raw div.content:first").text()
        // description of English man page
        var description = $("#raw dd")
        // paragraph
        var para = $("#raw p")

        // add tooltip to NAME
        $("#main div.content:first")
            .attr('title', 'More')
            .wrap('<a href="#" class="tooltip" title="' + name + '"></a>');

        // add tooltip to other DESCRIPTION
        $("dl:first dd").each(function (i) {
            $(this).attr('title', 'More');
            $(this).wrap('<a href="#" class="tooltip" title="' + description.slice(i, i+1).text() + '"></a>');
        });
        
        $("#main p").each(function (i) {
            if (i < para.size()) {
                $(this).attr('title', 'More');
                $(this).wrap('<a href="#" class="tooltip" title="' + para.slice(i, i+1).text() + '"></a>');
            }
        });
    }

});
