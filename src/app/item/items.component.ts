import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";
import {firebase} from "@nativescript/firebase";

@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {
    items: Array<Item>;
    constructor(private itemService: ItemService) { }

    showAlert(message) {
        let options = {
            title: message.title,
            message: message.body,
            okButtonText: "OK"
        };
        alert(options);
    }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
        firebase.init({
            showNotifications: true,
            showNotificationsWhenInForeground: true,
        }).then(() => {
            console.log('[Firebase] Initialized');
        }).catch(error => {
            console.log('[Firebase] Initialize', { error });
        });

        firebase.addOnPushTokenReceivedCallback((token) => {
            console.log('[Firebase] onPushTokenReceivedCallback: ', { token });
        }); 

        firebase.addOnMessageReceivedCallback((message) => {
            console.log("[Firebase] addOnMessageReceivedCallback: ", message);
            this.showAlert(message);
        });
    }
}
