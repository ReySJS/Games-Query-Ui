$(document).ready(() => {

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////Youtube API settings////////////////////////////
    let tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    ///////////////////////////Youtube API settings////////////////////////////
    ///////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////
    ////////////////////////////General Parameters/////////////////////////////
    let player;
    let currenTab;
    const games = [{
        "name": "Shadow of the Colossus",
        "description": "Shadow of the Colossus, released in Japan as Wander and the Colossus, is an action-adventure game developed by Japan Studio and Team Ico, and published by Sony Computer Entertainment for the PlayStation 2.",
        "videolink": "OYmUgbVLs4k",
        "developer": "Japan Studio, Team Ico",
        "publisher": "Sony Computer Entertainment - 2005"
    }, {
        "name": "Dota 2",
        "description": "Dota 2 is a multiplayer online battle arena (MOBA) video game developed and published by Valve.",
        "videolink": "-cSFPIwMEq4",
        "developer": "Valve",
        "publisher": "Valve - 2013"
    }, {
        "name": "Super Metroid",
        "description": "Super Metroid is an action-adventure game developed and published by Nintendo for the Super Nintendo Entertainment System in 1994.",
        "videolink": "x8yVTo0TTHo",
        "developer": "Nintendo R&D1, Intelligent Systems",
        "publisher": "Nintendo - 1994"
    }, {
        "name": "StarCraft II",
        "description": "StarCraft II: Wings of Liberty is a science fiction real-time strategy video game developed and published by Blizzard Entertainment.",
        "videolink": "M_XwzBMTJaM",
        "developer": "Blizzard Entertainment",
        "publisher": "Blizzard Entertainment - 2010"
    }, {
        "name": "World of Warcraft",
        "description": "World of Warcraft (WoW) is a massively multiplayer online role-playing game (MMORPG) released in 2004 by Blizzard Entertainment.",
        "videolink": "jSJr3dXZfcg",
        "developer": "Blizzard Entertainment",
        "publisher": "Blizzard Entertainment - 2004"
    }]


    for (let i = 0; i < games.length; i++) {
        $(`#tab-${i}`).html(games[i].name);
    }
    ////////////////////////////General Parameters/////////////////////////////
    ///////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////
    //////Parameters for defining the "tab" and "accordion" display models/////
    $("#tabs").tabs();
    $(".accordion").accordion({
        heightStyle: "content"
    });
    //////Parameters for defining the "tab" and "accordion" display models/////
    ///////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////
    ///////////////////Function to create the video iframe/////////////////////
    $("#tabs").on("click", ".tab", function () {
        $("h1").hide();
        clearPlayers();
        let tab = $(this).attr("value");
        currenTab = tab;

        player = new YT.Player(`player-${tab}`, {
            height: "270",
            width: "480",
            videoId: `${games[tab].videolink}`,
            playerVars: { "autoplay": 1, "controls": 0 },
            events: {
                "onReady": onPlayerReady
            }
        });
    })
    ///////////////////Function to create the video iframe/////////////////////
    ///////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////
    //////////////////Function to play the video automatically ////////////////
    function onPlayerReady(event) {
        event.target.playVideo();
        let duration = event.target.getDuration();
        $(`#details-description-${currenTab}`).html(games[currenTab].description);
        $(`#details-duration-${currenTab}`).html(formatTime(duration));
        $(`#details-developer-${currenTab}`).html(games[currenTab].developer);
        $(`#details-publisher-${currenTab}`).html(games[currenTab].publisher);
    }
    //////////////////Function to play the video automatically ////////////////
    ///////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////
    ////Function to convert the duration of seconds to the format hh:mm:ss/////
    function formatTime(_duration) {
        let measuredTime = new Date(null);
        measuredTime.setSeconds(_duration);
        let MHSTime = measuredTime.toISOString().substr(11, 8);
        return MHSTime;
    }
    ////Function to convert the duration of seconds to the format hh:mm:ss/////
    ///////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////
    ////////////////////Function to destroy unused players/////////////////////
    function clearPlayers() {
        if (player) {
            player.destroy();
            $(`#details-description-${currenTab}`).html("");
            $(`#details-duration-${currenTab}`).html("");
            $(`#details-developer-${currenTab}`).html("");
            $(`#details-publisher-${currenTab}`).html("");
        }
    };
    ////////////////////Function to destroy unused players/////////////////////
    ///////////////////////////////////////////////////////////////////////////
});
//getVideoData() - Return video title