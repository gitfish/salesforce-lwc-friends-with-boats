({
	onInit : function(component, event, helper) {
		var service = component.find("service");
        service.getNewRecord(
            "BoatReview__c",
            null,
            false,
            $A.getCallback(function() {
                var error = component.get("v.boatReviewError");
                if(error) {
                    console.log("Error initializing record template: " + JSON.stringify(error));
                    return;
                }
                var boat = component.get("v.boat");
                console.log("-- New Review Record for Boat: " + JSON.stringify(boat));
                component.set("v.boatReview.Boat__c", boat ? boat.Id : undefined);
        	})
        );
                          
	}
})