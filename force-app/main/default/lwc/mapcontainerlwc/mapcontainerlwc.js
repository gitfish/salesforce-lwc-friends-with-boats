import { LightningElement, track } from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubsub';

export default class Mapcontainerlwc extends LightningElement {
    @track
    lat;

    @track
    long;

    onPlotMapMarker(payload) {
        console.log(`-- Plot Map Marker: ${JSON.stringify(payload)}`);
        this.lat = payload.lat;
        this.long = payload.long;
    }

    connectedCallback() {
        registerListener("friendswithboats__plotmapmarker", this.onPlotMapMarker, this);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }
}