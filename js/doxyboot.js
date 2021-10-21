$( document ).ready(function() {
    // Set the high level structure of the document
    $("#side-nav, #doc-content").wrapAll("<div class='row' />");
    $("#side-nav").removeClass().addClass("col-md-3 border-right border-dark");
    $("#doc-content").addClass("col-md-9 py-3 pl-5");

    // Remove the top navigation. It isn't useful.
    $("#top").remove();

    // Remove the search results box.
    $("#MSearchSelectWindow").remove();
    $("#MSearchResultsWindow").remove();

    // All links use the primary color
    $("#doc-content a").addClass("text-primary");

    // Rebuild the side bar
    $("#nav-tree-contents").remove();
    $("#nav-tree").remove();
    $("#splitbar").remove();
    $("#nav-sync").remove();
    $("#nav-path").remove();
    $("#side-nav").append(`<nav id='nav-tree-contents' class='navbar navbar-expand-md navbar-light'></nav>`);

    // Clean up doc-content
    $("#doc-content").prepend(`
    <div class="jumbotron">
        <h1>` + $(".title").text() + `</h1>
    </div>`);
    $(".header").remove();
    $("#doc-content").append(`<div id="content" class="content"></div>`);
    $("#doc-content").children().filter(".PageDoc").children().appendTo("#doc-content");
    $("#doc-content").children().filter(".PageDoc").remove();
    $("#content").remove();

    // Add bootstrap classes to tables
    $("table").addClass("table");
    $(".markdownTable").addClass("table-striped");
    $(".directory").addClass("table-striped");

    // For the Data Structures page, remove a bunch of junk
    $(".levels").remove();
    $(".directory > tbody > tr > td > span").remove();
});