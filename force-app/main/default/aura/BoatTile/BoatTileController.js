({
	onBoatClick : function(component, event, helper) {
        // component event
		var boatSelectEvent = component.getEvent("boatselect");
        boatSelectEvent.setParam("boatId", component.get("v.boat").Id);
        boatSelectEvent.fire();
        
        // app event
        var boatSelectedEvent = $A.get("e.c:BoatSelected");
        boatSelectedEvent.setParam("boat", component.get("v.boat"));
		boatSelectedEvent.fire();
        
        // plot map marker app event
        var plotMapMarkerEvent = $A.get("e.c:PlotMapMarker");
        const boat = component.get("v.boat");
        plotMapMarkerEvent.setParams({
            sObjectId: boat.Id,
            lat: boat.Geolocation__Latitude__s,
            long: boat.Geolocation__Longitude__s,
            label: boat.Name
        });
        plotMapMarkerEvent.fire();
	}
})