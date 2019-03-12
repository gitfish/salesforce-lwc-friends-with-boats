import { LightningElement, track, api } from 'lwc';
import getBoats from "@salesforce/apex/BoatSearchResults.getBoats";

export default class Boatsearchresultslwc extends LightningElement {
    @track
    boats = [];

    @track
    boatsError;

    @track
    selectedboatId;

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
}