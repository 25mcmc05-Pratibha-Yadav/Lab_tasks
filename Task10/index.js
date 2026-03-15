(function($){

    $.fn.myTabs = function(options){

        var settings = $.extend({
            activeClass: "active",
            speed: 400,
            defaultTab: 0
        }, options);

        return this.each(function(){

            var container = $(this);
            var tabs = container.find(".tab-links li");
            var content = container.find(".tab-content");

            function openTab(index, changeHash){
                tabs.removeClass(settings.activeClass);
                content.removeClass("show").hide();

                var selectedTab = tabs.eq(index);
                var tabName = selectedTab.data("tab");

                selectedTab.addClass(settings.activeClass);
                $("#" + tabName).fadeIn(settings.speed).addClass("show");

                if(changeHash !== false){
                    window.location.hash = tabName;
                }
            }

          
            tabs.click(function(){
                openTab($(this).index(), true);
            });

            
            tabs.keydown(function(e){
                var index = $(this).index();

                if(e.key === "ArrowRight"){
                    index = (index + 1) % tabs.length;
                    tabs.eq(index).focus();
                    openTab(index, true);
                }

                if(e.key === "ArrowLeft"){
                    index = (index - 1 + tabs.length) % tabs.length;
                    tabs.eq(index).focus();
                    openTab(index, true);
                }

                if(e.key === "Enter"){
                    openTab(index, true);
                }
            });

            
            function checkHash(){
                var hash = window.location.hash.replace("#", "");

                if(hash){
                    var found = tabs.filter("[data-tab='" + hash + "']");
                    if(found.length){
                        openTab(found.index(), false);
                        return;
                    }
                }

                openTab(settings.defaultTab, false);
            }

            $(window).on("hashchange", checkHash);

            
            checkHash();

        });

    };

})(jQuery);
