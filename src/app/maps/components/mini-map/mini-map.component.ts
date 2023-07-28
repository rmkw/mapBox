import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {

  @Input() lngLat?: [ number, number ];
  @ViewChild('map') divMap?: ElementRef;


  ngAfterViewInit(): void {
    if ( !this.divMap?.nativeElement ) throw "LngLat can't be null";
    if ( !this.lngLat ) throw "LngLat can't be null";

    const map = new mapboxgl.Map({
    container: this.divMap.nativeElement, // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: this.lngLat, // starting position [lng, lat]
    zoom: 15, // starting zoom
    interactive: false
  });

  new Marker()
  .setLngLat( this.lngLat )
  .addTo( map )
  }





}
