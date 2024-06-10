import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CartService} from "../../../shared/services/cart.service";
import {map, Subject, Subscription} from "rxjs";
import {PopupComponent} from "../../../shared/components/popup/popup.component";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {

  private subject: Subject<number>;

  constructor(public cartService: CartService) {
    this.subject = new Subject<number>();
    let count = 0;
    const interval = setInterval(() => {
      this.subject.next(count++);
    }, 1000);

    const timeout1 = setTimeout(() => {
      this.subject.complete();
    }, 4000);

    // this.observable = from([1, 2, 3, 4, 5]);

    // this.observable = new Observable((observer) => {
    //   let count = 0;
    //   const interval = setInterval(() => {
    //     observer.next(count++);
    //   }, 1000);
    //
    //   const timeout1 = setTimeout(() => {
    //     observer.complete();
    //   }, 4000);
    //
    //   const timeout2 = setTimeout(() => {
    //     observer.error('world');
    //   }, 5000);
    //
    //   return {
    //     unsubscribe() {
    //       clearInterval(interval);
    //       clearTimeout(timeout1);
    //       clearTimeout(timeout2);
    //     }
    //   }
    // });
  }

  private subscription: Subscription | null = null;

  ngOnInit() {
    console.log(environment.production);
    // const myModalAlternative = new bootstrap.Modal('#myModal', {});
    // myModalAlternative.show();

    this.subscription = this.subject
      .subscribe(
        {
          next: (param: number) => {
            // console.log('subscriber 1: ', param);
          },
          error: (error: string) => {
            // console.log('ERROR!!! ' + error);
          }
        });
  }


  @ViewChild(PopupComponent)
  private popupComponent!: PopupComponent;

  ngAfterViewInit() {
    // this.popupComponent.open();
    console.log('hello');
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  test() {
    this.subject
      .pipe(
        map(number => {
          return 'Число ' + number;
        }))
      .subscribe((param: string) => {
        console.log('subscriber 2: ', param);
      });
  }
}
