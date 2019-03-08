({
	doInit : function(component, event, helper) {
		helper.onInit(component, event, helper);
	},
    onUserInfoClick : function(component, event, helper) {
        event.preventDefault();
        var navEvt = $A.get("e.force:navigateToSObject");
        if(navEvt) {
            navEvt.setParams({
              "recordId": event.target.dataset.userid,
            });
            navEvt.fire();
        }
    }
})