({
	onBoatSelected : function(component, event, helper) {
		var boat = event.getParam("boat");
        console.log("-- On Boat Selected: " + JSON.stringify(boat));
        component.set("v.id", boat ? boat.Id : undefined);
        var service = component.find("service").reloadRecord();
	},
    onRecordUpdated: function(component, event, helper) {
        console.log("-- Record Updated: " + JSON.stringify(component.get("v.boat")));
        var boatReviews = component.find("boatReviews");
        if(boatReviews) {
        	boatReviews.refresh();
        }
    },
    onBoatReviewAdded: function(component, event, helper) {
        console.log("-- Boat Review Added");
        component.set("v.selectedTabId", "boatreviewtab");
        var boatReviews = component.find("boatReviews");
        if(boatReviews) {
        	boatReviews.refresh();
    	}
    }
})