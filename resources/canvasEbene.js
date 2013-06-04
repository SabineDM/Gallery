$().ready(function(){
    $("img").each(function(){
        new ImageDiv(this);  
    });
    
});

var ImageDiv = function(image){
    this.id = image.id;
    var slideshowEbene1 = document.createElement("div");
    $(slideshowEbene1).css({
        "position":"relative",
        "height": image.height + "px",
        "width": image.width + "px"
    })
    $(slideshowEbene1).append(image);
    new DivCanvas(this.id, slideshowEbene1, image);
};

var DivCanvas = function(id, container, image)
{
    this.id = id;
    var canvasEbene = document.createElement("canvas");
    $(canvasEbene).css
    ({
        "position":"absolute",
        "height": image.height + "px",
        "width": image.width + "px",
        "top":"0px",
        "left":"0px"
    })
    $(container).append(canvasEbene);
    this._canvas = canvasEbene;
    this._g2d = canvasEbene.getContext("2d");
    this._g2d.lineWidth = 1;
    
    var self = this;
    this._anchor;
    this._opposite;
};