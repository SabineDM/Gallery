$(document).ready(function() {
    
    var gallery = new Gallery(".box");
    new Thumbnail(gallery, ".film");
    // new CollapseText(".text");
    new Textarea(".textarea");
});

function Gallery(container) {
    var self = this;
    this.container = $(container);
    self.load(this.container.find(".gallery-images li.active"));
    
    this.container.find(".gallery-control-next").click(function(ev) {
        ev.preventDefault();
        self.container.find(".gallery-images li.active").fadeOut(function() {
            var next = $(this).css("display", "").removeClass("active").next("li").first();
            if (next && next.length > 0) {
                self.load(next.addClass("active"));
            } else {
                self.load(self.container.find(".gallery-images li:first").addClass("active"));
            }
        });
    });
    this.container.find(".gallery-control-previous").click(function(ev) {
        ev.preventDefault();
        self.container.find(".gallery-images li.active").fadeOut(function() {
            var next = $(this).css("display", "").removeClass("active").prev("li").first();
            if (next && next.length > 0) {
                self.load(next.addClass("active"));
            } else {
                self.load(self.container.find(".gallery-images li:last").addClass("active"));
            }
        });
    });
    this.container.find(".text-visible").toggle(
        function() {
        //  $(".text-visible").replaceWith('<a class="text-hidden"><img src="resources/icons/chevron-right.png"/></a>');
            $(".gallery-container").animate({
                "left": "-=310px",
                width: "80%",
                marginLeft: "0.6in"}, 
                "slow");
            $("#collapse-icon").attr("src", "resources/icons/chevron-right.png");
        }, 
        function(){
            $( ".gallery-container" ).css({ 
                "left": "",
                width: "", 
                marginLeft: "" });
            $("#collapse-icon").attr("src", "resources/icons/chevron-left.png");
        }
    );


    // this.container.find(".fullscreen-control").click(function(ev) {
    //     ev.preventDefault();
        
    //     // self.container.find("li.active").supportsFullScreen(function() {
    //     //     var full = $(this).css("display", "active");
    //         // if (full) {
    //         //     ;
    //         // } else {
    //         //     self.load(self.container.find("li:last").addClass("active"));
    //         // }
    //     // });
    // });
    
}

Gallery.prototype.load = function(li) {
    var self = this;
    var imgElem = li.find("img");
    if (imgElem[0].complete) {
        self.resize(imgElem[0], imgElem);
    } else {
        imgElem.load(function() {
            self.resize(imgElem[0], imgElem);
        });
    }
    console.log("description: %s", li.find(".description").html());
    self.container.find(".text").html(li.find(".description").html());
};

Gallery.prototype.resize = function(image, imgElem) {
    console.log("width: %d height: %d", image.width, image.height);
    if (image.width >= image.height) {
        imgElem.css({width: "100%", margin: "auto 0", height: "auto"});
    } else {
        imgElem.css({height: "100%", margin: "0 auto", width: "auto"});
    }
    imgElem.show();
};
    
Gallery.prototype.show = function(index, container) {
    var self = this;
    var li = this.container.find(".gallery-images li:nth(" + index +")");
    this.container.find(".gallery-images li.active").fadeOut(function() {
        $(this).css("display", "").removeClass("active");
        li.addClass("active").css("display", "");
        self.load(li);
    });
};

function Thumbnail(gallery, container) {
    var self = $(this)
    $("li").click(function(ev){
        var index = $(this).index();
        gallery.show(index, container);
    });
}

function supportsFullScreen() {
	if (document["cancelFullScreen"] || document["webkitCancelFullScreen"] || document["mozCancelFullScreen"]) {
		return true;
	}
	return false;
}

function requestFullScreen(el) {
	var state = document["fullScreen"] || document["webkitIsFullScreen"] || document["mozFullScreen"];
	if (state) {
		var func = document["cancelFullScreen"] || document["webkitCancelFullScreen"] || document["mozCancelFullScreen"];
		func.call(document);
	} else {
		var func = (el["requestFullScreen"])
        || (el["webkitRequestFullScreen"])
        || (el["mozRequestFullScreen"]);
        if (func) {
        	func.call(el, true);
        }
    }
}
function Textarea(textarea){
    this.textarea = $(textarea);
    var img1 = this.textarea.find(".text-visible img");
    // console.log("img1: %o", img1);
    var field = this.textarea.find(".textfield div");
    img1.click(function () {
        // alert("hunu");
    console.log("img1: %o field: %o", img1, field);

    $(field).slideToggle("slow");
    });
}

// function CollapseText(textarea) {
//     function load(self){
//     	if ( div.style.display != "none" ) {
// 			div.style.display = 'none';
// 			div.style.width = '300px';
// 		}
// 		else {
// 			div.style.display = '';
// 			div.style.width = '0px';
// 		}
//     }
        
//     var self = this;
//     this.textarea = $(textarea);
//     // load(this.textarea.find("img"));
//     
//     this.textarea.find(".gallery-expand-text").click(function(ev) {
//         ev.preventDefault();
//         
//         self.textarea.find("div.text").fadeOut(function() {
//             var expand = $(this).css("display", "");
//             if (expand.display) {
//                 load(this.text.addClass("active"));
//             } 
//             else {
//                 load(this.text.find("div.text").addClass("hidden"));
//             }
//         });
//     }
// )}	
