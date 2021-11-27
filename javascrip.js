
// Get top heading 10 news by fetch API
var dataOld, dataNew;
fetch('https://gnews.io/api/v4/top-headlines?&token=bd1687365fd3a15cd11e6b22a5cfcf4f&lang=en')

    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var data1 = data.articles.map(function (val) {
            return `
                <div class='row news'>
                    <div class='col-md-4 image d-flex order-2 order-md-1'>
                        <img class='align-items-center' src=${val.image}>
                        </div>
                    <div class='col-md-8 content order-1 order-md-2'>
                        <div class='title text-center'>
                            <h3><a href=${val.url}>${val.title}</a></h3>
                        </div>
                        <div class='time text-right'>
                            ${val.publishedAt}
                        </div>
                        <div class='discrip'>
                            ${val.description}
                        </div>
                    </div>
                </div>
                `
        })
        $(".container-fluid").append(data1);
    });


// Model-box show/hide 
$("#search").click(function () {
    if ($(".model-overlay").css("display") == "none") {
        $(".model-overlay").css("display", "block");
        $("#model").css("display", "block");
    }
})
function funShow() {
    $("#model").hide()
    $(".model-overlay").css("display", "none");
}
$(".model-overlay").click(funShow)



// Search 10 news by keywords (fillter time if have)
$("#submit").click(function () {
    // Loading animation
    let loading = "<div id='preload' class='preload-container text-center'><span class='preload-icon '><i class='fas fa-spinner rotating'></i></span></div>";
    $("body").append(loading);
    $("body").addClass("preloading");

    //Get value from search bar
    let keys = $("#keywords").val();
    var url = "https://gnews.io/api/v4/search?q=" + keys + "&token=bd1687365fd3a15cd11e6b22a5cfcf4f";
    let timeFrom = $("#timeFrom").val();
    let timeTo = $("#timeTo").val();
    let fixFormat = "T00:00:00Z";

    var add = "";

    if ((timeFrom == "") & (timeTo == "")) {
        add = "";
    }
    else if (timeFrom == "") {
        add += "&to=" + timeTo + fixFormat;
    }
    else if (timeTo == "") {
        add += "&from=" + timeFrom + fixFormat;
    }
    else {
        add += "&from=" + timeFrom + fixFormat + "&to=" + timeTo + fixFormat;
    }

    url += add;
    console.log(url);
    fetch(url)
        .then(function (response) {
            $('body').removeClass('preloading');
            $('#preload').delay(3000).fadeOut('fast');
            return response.json();
        })
        .then(function (data) {
            $(".news").remove();
            let data2 = data.articles.map(function (val) {
                return `
            <div class='row news'>
                <div class='col-md-4 image d-flex order-2 order-md-1'>
                    <img class='align-items-center img-fluid' src=${val.image}>
                </div>
                <div class='col-md-8 content order-1 order-md-2'>
                    <div class='title text-center'>
                        <h3><a href=${val.url}>${val.title}</a></h3>
                    </div>
                    <div class='time text-right'>
                        ${val.publishedAt}
                    </div>
                    <div class='discrip'>
                        ${val.description}
                    </div>
                </div>

            </div>
            `
            })
            $(".container-fluid").append(data2);
        });
    funShow()
})

