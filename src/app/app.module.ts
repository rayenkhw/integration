import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { BookComponent } from './books/book/book.component';
import { ReservationComponent } from './reservations/reservation/reservation.component';
import { SubjectComponent } from './subjects/subject/subject.component';
import { UserComponent } from './users/user/user.component';
import { RessourceComponent } from './ressources/ressource/ressource.component';
import { LoginComponent } from './authentification/login/login.component';

import { AddResourceComponent } from './ressources/addresource/addresource.component';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    BookComponent,
    ReservationComponent,
    SubjectComponent,
    UserComponent,
    RessourceComponent,
    LoginComponent,

    AddResourceComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
