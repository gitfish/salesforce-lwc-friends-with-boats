({
    init : function(component, event, helper) {
        var navEvt = $A.get("e.force:navigateToSObject");
        component.set("v.fullDetailsVisible", navEvt ? true : false);
    },
	onFullDetails : function(component, event, helper) {
		var navEvt = $A.get("e.force:navigateToSObject");
        if(navEvt) {
            navEvt.setParams({
              "recordId": component.get("v.boat").Id
            });
            navEvt.fire();
        }
	}
})