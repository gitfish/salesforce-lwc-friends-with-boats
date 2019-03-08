({
    doSearch: function(component, event, helper) {
        var params = event.getParam("arguments");
        var boatTypeId = params ? params.boatTypeId : undefined;
        helper.onSearch(component, boatTypeId);
    },
    onBoatSelect: function(component, event, helper) {
        console.log("-- On Boat Select: " + event.getParam("boatId"));
        component.set("v.selectedBoatId", event.getParam("boatId"));
    }
})