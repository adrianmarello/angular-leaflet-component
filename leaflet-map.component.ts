import { Component, OnInit, ViewChild, Input, ElementRef, AfterViewInit } from '@angular/core';

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

    constructor() {}

    ngAfterViewInit() {
        this.initMap();
    }

    initMap() {
        let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGF0cmlja3IiLCJhIjoiY2l2aW9lcXlvMDFqdTJvbGI2eXUwc2VjYSJ9.trTzsdDXD2lMJpTfCVsVuA');
        let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGF0cmlja3IiLCJhIjoiY2l2aW9lcXlvMDFqdTJvbGI2eXUwc2VjYSJ9.trTzsdDXD2lMJpTfCVsVuA');
        var baseMaps = {
            "Satellite": satellite,
            "Streets": streets
        };

        let mapEle = this.mapElement.nativeElement;
        this.map = L.map(mapEle, {
            center: [this.latitude, this.longitude],
            zoom: this.zoom,
            scrollWheelZoom: false,
            layers: [streets]
        });
    }

    resizeMap(): void {
    
    }

    setCenter(latitude: number = this.latitude, longitude: number = this.longitude): void {
        
    }

    setBounds(layer: any, route:boolean=false): void {}

    prepareRoute(layer: string){}

    setRoute(origin: any, destination:any){}

    removeRoute(){}

    setMarkerOnClick(layer:string){}

    setHeightMap(height: number): void {
        this.height_map = height;
    }

    createLayer(layer: string){
        this.layers[layer] = L.geoJSON().addTo(this.map);
    }

    hiddenLayer(layer?: string) {}

    addGeoJson(layer: string, json: any){
        this.layers[layer].addData(json);
    }

    addOnClick(layer: string){}

    removeFeatureByPk(layer: string, feature: any) {}

    setIcons(layer: string, icon: any){
        this.layers[layer].eachLayer(function(layer){
            layer.setIcon(layer.options.icon = icon);
        });
    }

    setLabel(layer: string){}

}
