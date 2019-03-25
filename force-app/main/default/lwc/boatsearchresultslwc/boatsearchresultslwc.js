import { LightningElement, track, api, wire } from 'lwc';
import getBoats from "@salesforce/apex/BoatSearchResults.getBoats";
import { fireEvent } from "c/pubsub";
import { CurrentPageReference } from 'lightning/navigation';

export default class Boatsearchresultslwc extends LightningElement {
    @track
    boats = [];

    @track
    searchState = {
        searched: false,
        searching: false,
        error: false
    };

    @track
    selectedBoatId;

    @wire(CurrentPageReference)
    pageRef;

    get boatsEmpty() {
        return !this.boats || this.boats.length === 0;
    }

    @api
    async search(boatTypeId) {
        this.searchState.searched = true;
        this.searchState.searching = true;
        try {
            this.boats = await getBoats({ boatTypeId: boatTypeId });
        } catch(error) {
            this.searchState.error = error;
        } finally {
            this.searchState.searching = false;
        }
    }

    onBoatSelect(event) {
        // boat selected
        const boat = event.detail.boat;
        if(boat) {
            this.selectedBoatId = boat.Id;
            fireEvent("friendswithboats__boatselected", { boat: boat });
            fireEvent("friendswithboats__plotmapmarker", {
                sObjectId: boat.Id,
                lat: boat.Geolocation__Latitude__s,
                long: boat.Geolocation__Longitude__s,
                label: boat.Name
            });
        }
    }
}