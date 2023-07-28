import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker{
  color: string;
  lngLat: number[];
}

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {

  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  // public zoom: number = 10;
  public map?: Map;
  public centroDelMapa: LngLat = new LngLat(-102.29529286211566, 21.880654372297613)


  ngAfterViewInit(): void {


    if ( !this.divMap ) throw 'elemento HTML no fue encontrado'
    this.map = new Map({
    container: this.divMap.nativeElement, // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: this.centroDelMapa, // starting position [lng, lat]
    zoom: 13, // starting zoom
  });


  this.readFromLocalStorage();

  // const customMarker = document.createElement('div');
  // customMarker.innerHTML = 'LuiS'

  // const marker = new Marker({
  //   color: 'black',
  //   element: customMarker
  // })
  // .setLngLat( this.centroDelMapa )
  // .addTo( this.map )

}

createMarker(){
  if ( !this.map ) return;

   const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
   const lngLat = this.map.getCenter();

  this.addMarker( lngLat, color);

}


addMarker(lngLat: LngLat, color: string){
  if ( !this.map ) return;

  const marker = new Marker({
    color: color,
    draggable: true,
  })
  .setLngLat( lngLat )
  .addTo( this.map );

  this.markers.push( { color, marker } );

  this.saveToLocalStorage();

  marker.on('dragend', () => {

    this.saveToLocalStorage();
  });
}

deleteMarker( index: number ) {
  this.markers[ index ].marker.remove(); //delete marker
  this.markers.splice( index, 1 ); // delete etiqueta
}

flyTo( marker: Marker ){

  this.map?.flyTo({
    zoom: 14,
    center: marker.getLngLat()
   });

}

saveToLocalStorage() {

console.log(this.markers)
  const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker }) =>{
    return {
      color,
      lngLat: marker.getLngLat().toArray()
    }
  });
  console.log( plainMarkers )

  localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ))
}

readFromLocalStorage() {

const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString ); // ! OJO!

plainMarkers.forEach( ({ color, lngLat }) => {
  const [ lng, lat ] = lngLat;
  const coords = new LngLat( lng, lat );


  this.addMarker( coords, color );
});

}


}
