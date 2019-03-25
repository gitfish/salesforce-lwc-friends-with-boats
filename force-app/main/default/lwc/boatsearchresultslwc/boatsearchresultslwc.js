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
            this.boatsError = error;
        } finally {
            this.searchState.searching = false;
        }
    }

    onBoatSelect(event) {
        this.selectedBoatId = event.detail.boatId;
        fireEvent("friendswithboats__boatselected", { ...event.detail });
    }
}