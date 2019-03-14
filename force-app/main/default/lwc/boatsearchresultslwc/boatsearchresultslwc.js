import { LightningElement, track, api, wire } from 'lwc';
import getBoats from "@salesforce/apex/BoatSearchResults.getBoats";
import { fireEvent } from "c/pubsub";
import { CurrentPageReference } from 'lightning/navigation';

export default class Boatsearchresultslwc extends LightningElement {
    @track
    boats = [];

    @track
    boatsError;

    @track
    selectedBoatId;

    @wire(CurrentPageReference)
    pageRef;

    get boatsEmpty() {
        return !this.boats || this.boats.length === 0;
    }

    @api
    async search(boatTypeId) {
        try {
            this.boats = await getBoats({ boatTypeId: boatTypeId });
        } catch(error) {
            this.boatsError = error;
        }
    }

    onBoatSelect(event) {
        this.selectedBoatId = event.detail.boatId;
        fireEvent("friendswithboats__boatselected", { ...event.detail });
    }
}