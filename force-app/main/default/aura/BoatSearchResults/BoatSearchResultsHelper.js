({
	onSearch : function(component, boatTypeId) {
        console.log("-- Search By Boat Type Id: " + boatTypeId);
		var action = component.get("c.getBoats");
        action.setParam("boatTypeId", boatTypeId);
        action.setCallback(this, function(response) {
            if(response.getState() === "SUCCESS") {
                var boats = response.getReturnValue() || [];
                console.log("-- Boats: " + JSON.stringify(boats));
                component.set("v.boats", boats);
                component.set("v.boatsEmpty", boats.length === 0);
                console.log("-- All Done");
            } else if(response.getState() === "ERROR") {
                console.log("-- Error");
                component.set("v.error", response.getError());
            }
        });
        $A.enqueueAction(action);
	}
})