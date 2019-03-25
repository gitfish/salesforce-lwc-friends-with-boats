import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import leaflet from "@salesforce/resourceUrl/leaflet";
import { loadScript, loadStyle } from "lightning/platformResourceLoader";

const defaultLatLng = [42.356045, -71.085650];

export default class Maplwc extends LightningElement {
    _lat;
    _long;
    _marker;

    updateMarker() {
        const m = this.marker;
        if(m) {
            const latLng = this.latLng;
            m.setLatLng(latLng);
            this.map.setView(latLng);
        }
    }
    
    @api
    get lat() {
        return this._lat;
    }
    set lat(value) {
        if(value !== this._lat) {
            this._lat = value;
            this.updateMarker();
        }
    }

    @api
    get long() {
        return this._long;
    }
    set long(value) {
        if(value !== this._long) {
            this._long = value;
            this.updateMarker();
        }
    }

    get latLng() {
        return this._lat !== undefined &&
                this._lat !== null &&
                this._long !== undefined &&
                this._long !== null ? [this._lat, this._long] : defaultLatLng;
    }

    @track
    mapInit = false;

    map;

    get marker() {
        if(!this._marker && this.map && this._lat && this._long) {
            let myIcon = window.L.divIcon({
                className: 'my-div-icon',
                html: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 52 52"><path fill="#DB4437" d="m26 2c-10.5 0-19 8.5-19 19.1 0 13.2 13.6 25.3 17.8 28.5 0.7 0.6 1.7 0.6 2.5 0 4.2-3.3 17.7-15.3 17.7-28.5 0-10.6-8.5-19.1-19-19.1z m0 27c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"></path></svg>'
            });
            const latLng = [this._lat, this._long];
            this._marker = window.L.marker(latLng, {icon: myIcon});
            this._marker.addTo(this.map);
            this.map.setView(latLng);
        }
        return this._marker;
    }

    renderedCallback() {
        if(!this.mapInit) {
            this.mapInit = true;
            Promise.all([
                loadScript(this, `${leaflet}/leaflet.js`),
                loadStyle(this, `${leaflet}/leaflet.css`)
            ]).then(() => {
                const el = this.template.querySelector(".map");
                console.log("-- Map Target Element: " + el);
                this.map = window.L.map(el, {zoomControl: true}).setView(this.latLng, 13);
                this.map.scrollWheelZoom.disable();
                window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {attribution: 'Tiles © Esri'}).addTo(this.map);
                console.log("-- Initialized Leaflet");
            }).catch(error => {
                console.log("-- Error initializing Leaflet");
                console.error(error);
                this.dispatchEvent(new ShowToastEvent({
                    title: "Error loading Five Star",
                    message: error.body.message,
                    variant: "error"
                }))
            });
        }
    }
}