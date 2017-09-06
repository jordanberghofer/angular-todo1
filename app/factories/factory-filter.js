"use strict";

/*
    
    the sole purpose of this factory is to enable communication between the navbar controller and the list controller
    they will need this data to communicate the ng-model "searchText" in the navbar ctrl
    and the filter in the list ctrl
    
 */

app.factory("filterFactory", function(){
    return {
        search: ""
    };
});