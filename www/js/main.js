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
            vistories.append('<div class="summary" data-url="vistories/'+response[i]["file"]+'"><h1>'+response[i]["title"]+'</h1><p>'+response[i].summary+'</p><p class="tags">'+response[i]["tags"]+'</p></div>');
        }

        // Add the tags and their respective counts to the filters section
        let filter = $("#filterlist");

        for (var tag in tagCounts) {
            filter.append("<li>"+tag+"("+tagCounts[tag]+")</li>");
        }

        // Now set the events for when someone clicks on an ngs tag
        $("#filterlist li").click(function () {
            $(this).toggleClass("selected");
            updateFilters();
        })

        // Set the events if someone clicks on a vistory
        $(".summary").click(function() {
            showVistory($(this));
        })

    })
}


// This is called when someone clicks on a vistory summary
// and we need to load it into the main iframe
let showVistory = function (summary) {
    // TODO: Get the actual vistory URL
    var vistoryTarget = $("#vistorytarget");

    vistoryTarget.show();
    vistoryTarget.attr("src",summary.data("url"));


}


// This is called any time a tag is changed so we can update
// the set of vistories which are shown
let updateFilters = function () {
    tagList = [];
    $("#filterlist li.selected").each(function() {  
        tagList.push($(this).text().replace(/\(.*/,""));
    })

    console.log("Selected tags are "+tagList);

    // Now we need to go through the vistories and collect all of
    // the tags there.  We can then check them against the selected
    // ones to show which ones match.

    $("div.summary").each(function() {

        // If there aren't any filters, we just show everything
        if (tagList.length == 0) {
            $(this).show();
        }

        else {
            let theseTags = $(this).find("p.tags").text().split(",");

            var failedTag = false;

            for (var i=0;i<tagList.length;i++) {
                tag = tagList[i];
                if (theseTags.indexOf(tag)<0) {
                    failedTag = true;
                    break;
                }
                else {
                    console.log("Found "+tag+" in "+theseTags);
                }
            }

            if (failedTag) {
                $(this).hide();
            }
            else {
                $(this).show();
            }
        }
    })


}





// Main JQuery load point
$(document).ready(function () {

    loadVistories();

    $("#showhelp").click(function() {
        $("#helpcontent").slideToggle();
    })

})