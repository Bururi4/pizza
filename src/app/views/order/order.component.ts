import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "../../shared/services/cart.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {ProductService} from "../../shared/services/product.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  formValues = {
    productTitle: '',
    address: '',
    phone: '',
  }

  constructor(private cartService: CartService, private activatedRoute: ActivatedRoute, private productService: ProductService) {

  }

  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;

  ngOnInit(): void {
    // if (this.cartService.product-card) {
    //   this.formValues.productTitle = this.cartService.product-card;
    // }

    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.formValues.productTitle = params['product'];
      }
    })

    // const productParam = this.activatedRoute.snapshot.queryParamMap.get('product');
    // if (productParam) {
    //   this.formValues.productTitle = productParam;
    // }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
  }

  createOrder() {
    if (!this.formValues.productTitle) {
      alert('Выберите пиццу');
      return;
    }
    if (!this.formValues.address) {
      alert('Заполните адрес');
      return;
    }
    if (!this.formValues.phone) {
      alert('Укажите номер телефона');
      return;
    }

    //ajax
   this.subscriptionOrder = this.productService.createOrder({
      product: this.formValues.productTitle,
      address: this.formValues.address,
      phone: this.formValues.phone,
    })
      .subscribe(response => {
        if (response.success && !response.message) {
          alert('Спасибо за заказ!');
          this.formValues = {
            productTitle: '',
            address: '',
            phone: '',
          }
        } else {
          alert('Ошибка!');
        }
      })
  }
}
