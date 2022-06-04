import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Stores } from 'src/app/models/stores';
import { Loader } from '@googlemaps/js-api-loader';
import { styles } from './mapstyle';
import { StoreService } from 'src/app/store.service';

@Component({
  selector: 'app-maps-view',
  templateUrl: './maps-view.component.html',
  styleUrls: ['./maps-view.component.scss'],
})
export class MapsViewComponent implements OnInit {
  storeDetails: any;
  title = 'google-map';
  storesNearBy: any;
  marker: any;
  private map: any;
  InforObj: any[] = [];

  constructor(
    private _route: ActivatedRoute,
    private storesService: StoreService
  ) {}

  ngOnInit(): void {
    const loader = new Loader({
      apiKey: 'AIzaSyBrgOWH9fRQEARWyTXtVXVaH-da5IreCig',
    });

    //fecthing the location for given latitude and longtitude
    const location = {
      lat: Number(this._route.snapshot.params['LATITUDE']),
      lng: Number(this._route.snapshot.params['LONGITUDE']),
    };

    loader.load().then(() => {
      this.map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: location,
          zoom: 20,
          styles: styles,
        }
      );

      // marker to point out store location initially
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
      });

      // event call as the user zooms out
      this.map.addListener('zoom_changed', () => {
        var d = this.map.getBounds().getNorthEast().lng();
        var b = this.map.getBounds().getSouthWest().lng();
        var c = this.map.getBounds().getNorthEast().lat();
        var a = this.map.getBounds().getSouthWest().lat();
        let mapBounds = [{ a, b, c, d }];
        this.storesService
          .fetchZoomData(mapBounds)
          .subscribe((storesData: any) => {
            this.storesNearBy = storesData;
            this.storesNearBy.forEach(
              (location: {
                LATITUDE:
                  | number
                  | google.maps.LatLng
                  | google.maps.LatLngLiteral;
                LONGITUDE: number | boolean | null | undefined;
                STORE_ID: string;
              }) => {
                this.marker = new google.maps.Marker({
                  position: new google.maps.LatLng(
                    location.LATITUDE,
                    location.LONGITUDE
                  ),
                  map: this.map,
                });

                // information windown html code
                const contentString =
                  '<div id="content">' +
                  '<div id="siteNotice">' +
                  '</div>' +
                  '<h1 id="firstHeading" class="firstHeading">Store ID : ' +
                  location.STORE_ID +
                  '</h1>' +
                  '<div id="bodyContent">' +
                  '<p>The is just sample data showing information about the store. ' +
                  '(last visited June 22, 2009).</p>' +
                  '</div>' +
                  '</div>';

                const infowindow = new google.maps.InfoWindow({
                  content: contentString,
                });

                // event for mouse hover over the marker
                this.marker.addListener('mouseover', () => {
                  this.closeOtherinfo();
                  infowindow.open({
                    anchor: new google.maps.Marker({
                      position: new google.maps.LatLng(
                        location.LATITUDE,
                        location.LONGITUDE
                      ),
                      map: this.map,
                    }),
                    map: this.map,
                    shouldFocus: true,
                  });
                  this.InforObj[0] = infowindow;
                });
              }
            );
          });
      });
    });
  }

  // code to close info block of other markers
  closeOtherinfo(): void {
    if (this.InforObj.length > 0) {
      /* detach the info-window from the marker ... undocumented in the API docs */
      this.InforObj[0].set('marker', null);
      /* and close it */
      this.InforObj[0].close();
      /* blank the array */
      this.InforObj.length = 0;
    }
  }
}
