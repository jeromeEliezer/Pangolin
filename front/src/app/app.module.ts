import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { appReducer, appStateInitial } from './state/reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuOverviewComponent } from './menu-overview/menu-overview.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserAuthComponent,
    FooterComponent,
    HeaderComponent,
    MenuOverviewComponent,
    UserListComponent,
  ],
  imports: [
    StoreModule.forRoot(appReducer, {initialState: appStateInitial} ),
    StoreDevtoolsModule.instrument({ maxAge: 25}),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
