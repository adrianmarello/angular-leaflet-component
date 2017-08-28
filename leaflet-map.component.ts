import { Component, ViewChild, Input, ElementRef, AfterViewInit } from '@angular/core';

import * as L from 'leaflet';


@Component({
    selector: 'app-leaflet-map',
    templateUrl: './leaflet-map.component.html',
    styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements AfterViewInit {

    @ViewChild('map') mapElement: ElementRef;

    // MAP CONFIG
    @Input() zoom: number = 14;
    @Input('lat') latitude: number = -28.468452;
    @Input('lng') longitude: number = -65.779094;
    @Input('height_map') public height_map;

    // INITIAL VARS
    map: any;
    layers: any[] = [];
    polyline: any;
    myPositionMarker: any;
    originRouteLatLng: any;
    destRouteLatLng: any;
    destRouteLatLngGlobal: any;

    constructor() {
        this.layers = [];
    }

    ngAfterViewInit() {
        this.initMap();
    }

    initMap() {
        let streets = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
        let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/marello/cj6qgzbte3h9e2rrqiq5pyabu/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFyZWxsbyIsImEiOiJjajZxZ3lkOWowOTNjMnFycHFjamIxN2ZxIn0.nckB8pwG_yOJGQXBU0KOZA');
        var baseMaps = {
            "Satellite": satellite,
            "Streets": streets
        };

        let mapEle = this.mapElement.nativeElement;
        this.map = L.map(mapEle, {
            center: [this.latitude, this.longitude],
            zoom: this.zoom,
            scrollWheelZoom: false,
            layers: [satellite, streets]
        });
       
    }

    // MAP METHODS

    resizeMap(): void {
        this.map.resize()
    }

    setCenter(latitude: number = this.latitude, longitude: number = this.longitude): void {}

    setBounds(layer: any, route:boolean=false): void {}
    
    setHeightMap(height: number): void {
        this.height_map = height;
    }


    // LAYER METHODS

    createLayer(layer: string) {
        this.layers[layer] = L.geoJSON().addTo(this.map);
    }

    removeLayer(layer: string) {
        this.map.removeLayer(this.layers[layer]);
    }

    addGeoJson(layer: string, json: any) {
        this.layers[layer].addData(json);
    }

    removeFeature(layer: string, feature: any) {
        this.layers[layer].eachLayer(_layer =>{
            if(_layer.feature.properties.id == feature.properties.id) {
                this.layers[layer].removeLayer(_layer._leaflet_id);
            }
        });
    }

    setIcons(layer: string, icon: any) {
        this.layers[layer].eachLayer(function(layer){
            layer.setIcon(layer.options.icon = icon);
        });
    }


    // ROUTE METHODS

    prepareRoute(layer: string){}

    setRoute(origin: any, destination:any){}

    removeRoute(){}


    // MARKER METHODS

    setMarkerOnClick(layer:string){}
    
    addOnClick(layer: string){}

    setLabel(layer: string){}

}
