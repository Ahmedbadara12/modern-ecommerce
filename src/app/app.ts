import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { ToastComponent } from './components/toast/toast';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer';
import { WishlistDrawerComponent } from './components/wishlist-drawer/wishlist-drawer';
import { LoginModalComponent } from './components/login-modal/login-modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, ToastComponent, CartDrawerComponent, WishlistDrawerComponent, LoginModalComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  title = 'Nexus Ecommerce';
}
