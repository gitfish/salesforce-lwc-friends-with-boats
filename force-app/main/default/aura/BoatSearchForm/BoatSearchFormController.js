({
	init : function(component, event, helper) {
        // only make new available if the create record event's available
        var createRecordEvent = $A.get("e.force:createRecord");
        component.set("v.newAvailable", createRecordEvent ? true : false);
        
        // initialize boat type options
        var boatTypeOptions = [{
            label: "Loading Boat Types...",
            value: ""
        }];
        component.set("v.boatTypeOptions", boatTypeOptions);
        component.set("v.selectedBoatType", "");
        var boatTypeCombo = component.find("boatTypeCombo");
        boatTypeCombo.set("v.disabled", true);
		var action = component.get("c.getAllBoatTypes");
        action.setCallback(this, function(response) {
            if(response.getState() === "SUCCESS") {
                var result = response.getReturnValue() || [];
                boatTypeOptions = result.map(function(r) {
                    return {
                        label: r.Name,
                        value: r.Id
                    };
                });
                boatTypeOptions.unshift({
                    label: "All Types",
                    value: ""
                });
                console.log("-- Boat Type Options: " + JSON.stringify(boatTypeOptions));
                component.set("v.boatTypeOptions", boatTypeOptions);
        		boatTypeCombo.set("v.disabled", false);
            } else if(response.getState() === "ERROR") {
                boatTypeOptions = [{
                    label: "Error loading Boat types",
                    value: ""
                }];
                component.set("v.boatTypeOptions", boatTypeOptions);
            }
        });
        $A.enqueueAction(action);
	},
    handleBoatTypeChange: function(component, event, helper) {
        
    },
    onFormSubmit: function(component, event, helper) {
        var formSubmitEvent = component.getEvent("formsubmit");
        formSubmitEvent.setParam("formData", {
            boatTypeId: component.find("boatTypeCombo").get("v.value")
        });
        formSubmitEvent.fire();
    },
    handleNewType: function(component, event, helper) {
        var createRecordEvent = $A.get("e.force:createRecord");
        if(createRecordEvent) {
            const selectedBoatType = component.find("boatTypeCombo").get("v.value");
            createRecordEvent.setParams({
                entityApiName: "Boat__c",
                defaultFieldValues: {
                	'BoatType__c' : selectedBoatType ? selectedBoatType : undefined
                }
            });
            createRecordEvent.fire();
        }
    }
})