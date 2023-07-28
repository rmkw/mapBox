import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';


//Aguascalientes
//-102.29529286211566, 21.880654372297613

@Component({
  selector: 'app-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy{


  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;

  public map?: Map;

  public centroDelMapa: LngLat = new LngLat(-102.29529286211566, 21.880654372297613)


  ngAfterViewInit(): void {


    if ( !this.divMap ) throw 'elemento HTML no fue encontrado'
    this.map = new Map({
    container: this.divMap.nativeElement, // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: this.centroDelMapa, // starting position [lng, lat]
    zoom: this.zoom, // starting zoom
  });


  this.mapListeners();

  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners(){

    if ( !this.map ) throw 'Mapa no existe';

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if ( this.map!.getZoom() < 18 ) return;

      this.map!.zoomTo(18);
    });

    this.map.on('move', () =>{
      this.centroDelMapa = this.map!.getCenter();
      const { lng, lat } = this.centroDelMapa;

    })
  }

  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }

  zoomChange( value:string ){
    this.zoom = Number(value);
    this.map?.zoomTo( this.zoom )

  }

}
