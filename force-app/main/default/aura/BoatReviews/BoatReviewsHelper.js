({
	onInit : function(component, event, helper) {
		var getReviews = component.get("c.getAll");
        var boatId = component.get("v.boat").Id;
        console.log("-- Getting Reviews for boat: " + boatId);
        getReviews.setParam("boatId", boatId);
        getReviews.setCallback(this, function(response) {
        	if(response.getState() === "SUCCESS") {
                var reviews = response.getReturnValue() || [];
                console.log("-- Reviews: " + JSON.stringify(reviews));
                component.set("v.boatReviews", reviews);
                component.set("v.boatReviewsEmpty", reviews.length === 0);
            } else if(response.getState() === "ERROR") {
                console.log("-- Error Retrieving Reviews: " + response.getError());
            } 
        });
        $A.enqueueAction(getReviews);
	}
})