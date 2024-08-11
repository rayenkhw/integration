import { Component, OnInit } from '@angular/core';
import { BookComponent } from 'app/books/book/book.component';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user', title: 'Users',  icon:'group', class: '' },
    { path: '/ressource', title: 'Ressources',  icon:'library_books', class: '' },
    { path: '/book', title: 'PFE Books',  icon:' menu_book', class: ''},
    { path: '/reservation', title: 'Reservations',  icon:'calendar_month', class: '' },
    { path: '/subject', title: 'Subjects',  icon:'hub', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
