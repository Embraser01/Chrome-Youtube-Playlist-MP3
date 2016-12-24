(function () {
    const CONT_ID = "watch8-secondary-actions";
    const DEST_URL = "http://youtubeplaylist-mp3.com/?";
    const ICON_URL = chrome.extension.getURL('download.svg');
    const CHECK_DELAY = 5; //sec

    function buildButtonHTML(url, text) {
        return "<button class=\"yt-uix-button yt-uix-button-size-default yt-uix-button-opacity\" type=\"button\" " +
            "onclick=\"window.open('" + url + "')\" title=\"" + text + "\">" +
            "<img src=\"" + ICON_URL + "\">" +
            "<span class=\"yt-uix-button-content\">" + text + "</span>" +
            "</button>";
    }

    // If the container doesn't exist
    if (!document.getElementById(CONT_ID)) return;

    // Parser

    let queryString = /\?(.+)/g.exec(document.location.toString());
    let queryData = {};

    if (queryString && queryString.length) {
        (queryString[1].split("&") || []).forEach(function (data) {
            data = data.split("=");
            queryData[data[0]] = data[1];
        });
    }


    // We build buttons and add it to the container

    for (let i in queryData) {
        let elem;
        let last_button;

        switch (i) {
            case 'v':
                elem = buildButtonHTML(DEST_URL + i + "=" + queryData[i], "Get MP3");
                break;
            case 'list':
                elem = buildButtonHTML(DEST_URL + i + "=" + queryData[i], "Get playlist");
                break;
            default:
                break;
        }
        if (elem) {
            (function addToDOM(elem) {
                let cont = document.getElementById(CONT_ID);

                if (cont && !cont.contains(last_button)) {
                    cont.insertAdjacentHTML('beforeend', elem);
                    last_button = cont.lastElementChild;
                }

                setTimeout(() => addToDOM(elem), 1000 * CHECK_DELAY);
            })(elem);
        }
    }
})();