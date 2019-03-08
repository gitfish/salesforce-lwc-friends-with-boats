({
	onFormSubmit : function(component, event, helper) {
        console.log("-- On Form Submit");
		const boatSearchResults = component.find("boatSearchResults");
        const formData = event.getParam("formData");
        console.log("-- Form Data: " + JSON.stringify(formData));
        console.log("-- Form Data Boat Type Id: " + formData.boatTypeId);
        boatSearchResults.search(formData.boatTypeId);
	}
})