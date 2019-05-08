// Be good an use strict mode
'use-strict';


// Set up the vistories when we first load the page
let loadVistories = function () {
    // Get the JSON index file

    $.get("courses.json",function(response){

        let vistories = $("#vistories");

        let tagCounts = {};

        for (var i=0;i<response.length;i++) {
            console.log("Found vistory "+response[i]["title"]);
            let tags = response[i]["tags"].split(",");

            for (var j=0;j<tags.length;j++) {
                if (tags[j] in tagCounts) {
                    tagCounts[tags[j]] += 1;
                }
                else {
                    tagCounts[tags[j]] = 1;
                }
            }
            vistories.append('<div class="summary"><h1>'+response[i]["title"]+'</h1><p>'+response[i].summary+'</p><p class="tags">'+response[i]["tags"]+'</p></div>');
        }

        // Add the tags and their respective counts to the filters section
        let filter = $("#filterlist");

        for (var tag in tagCounts) {
            filter.append("<li>"+tag+"("+tagCounts[tag]+")</li>");
        }

        // Now set the events for when someone clicks on an ngs tag
        $("#filterlist li").click(function () {
            $(this).toggleClass("selected");
        })

    })



}





// Main JQuery load point
$(document).ready(function () {

    loadVistories();


})