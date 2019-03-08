({
	doInit : function(component, event, helper) {
		helper.onInit(component, event, helper);
	},
    onRecordUpdated : function(component, event, helper) {
        var changeType = event.getParams().changeType;
		
        if (changeType === "CHANGED") {
            var resultsToast = $A.get("e.force:showToast");
            if(resultsToast) {
                resultsToast.setParams({
                    "title": "Saved",
                    "message": "Review Saved."
                });
                resultsToast.fire();
            } else {
                alert("Review Saved");
            }
        }
    },
    onSave : function(component, event, helper) {
        component.find("service").saveRecord(function(saveResult) {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                // record is saved successfully
                var resultsToast = $A.get("e.force:showToast");
                if(resultsToast) {
                    resultsToast.setParams({
                        "title": "Saved",
                        "message": "Review Saved."
                    });
                    resultsToast.fire();
                } else {
                    alert("Review Saved");
                }
                var addedEvent = component.getEvent("boatreviewadded");
                addedEvent.fire();
                // reset
                helper.onInit(component, event, helper);
            } else if (saveResult.state === "INCOMPLETE") {
                // handle the incomplete state
                console.log("User is offline, device doesn't support drafts.");
            } else if (saveResult.state === "ERROR") {
                // handle the error state
                console.log('Problem saving review, error: ' + JSON.stringify(saveResult.error));
            } else {
                console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
            }
        });
    }
})