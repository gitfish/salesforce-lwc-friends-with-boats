import { LightningElement, api, track } from 'lwc';
import { registerListener, unregisterListener } from "c/pubsub";
import getBoatById from "@salesforce/apex/BoatSearchResults.getBoatById";

export default class Boatdetailslwc extends LightningElement {

    @track
    boatId;

    @track
    boat;

    @track
    boatLoading = false;

    @track
    boatLoadError;

    @api
    selectedTabId;

    get boatSpecified() {
        return this.boat ? true : false;
    }

    async loadBoat(boatId) {
        console.log(`-- Load Boat: ${boatId}`);
        this.boatId = boatId;
        this.boatLoading = true;
        try {
            this.boat = await getBoatById({ boatId: boatId });
            console.log(`-- Boat Loaded: ${JSON.stringify(this.boat)}`);
        } catch(error) {
            this.boatLoadError = error;
        } finally {
            this.boatLoading = false;
        }
    }

    onBoatSelected(payload) {
        console.log(`-- App Event: Boat Selected: ${JSON.stringify(payload)}`);
        this.loadBoat(payload.boatId);
        
    }

    connectedCallback() {
        console.log("-- Registering Boat Selected Listener");
        registerListener("friendswithboats__boatselected", this.onBoatSelected, this);
    }

    disconnectedCallback() {
        unregisterListener("friendswithboats__boatselected", this.onBoatSelected, this);
    }

}