import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import fivestar from "@salesforce/resourceUrl/fivestar";
import { loadScript, loadStyle } from "lightning/platformResourceLoader";

export default class Fivestarratinglwc extends LightningElement {

    _value = 0;

    @api
    readonly = false;

    @api
    get value() {
        return this._value;
    }
    set value(value) {
        if(value !== this._value) {
            this._value = value;
            if(this.ratingInstance) {
                this.ratingInstance.setRating(this._value, false);
            }
        }
    }

    ratingInstance;

    get currentClass() {
        return `${this.readonly ? "readonly " : ""}c-rating`;
    }

    renderedCallback() {
        Promise.all([
            loadScript(this, `${fivestar}/rating.js`),
            loadStyle(this, `${fivestar}/rating.css`)
        ]).then(() => {
            console.log("-- Script and Styles loaded");
            const el = this.template.querySelector("ul");
            const callback = (rating) => {
                this.dispatchEvent(new CustomEvent("valuechange", {
                    detail: {
                        rating: rating
                    }
                }))
            };
            // eslint-disable-next-line no-undef
            this.ratingInstance = rating(el,this.value,5,callback,this.readonly);
        }).catch(error => {
            console.log("-- Error loading five star resources");
            console.error(error);
            this.dispatchEvent(new ShowToastEvent({
                title: "Error loading Five Star",
                message: error.body.message,
                variant: "error"
            }))
        });
    }


}