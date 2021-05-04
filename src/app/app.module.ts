import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileLoaderComponent } from './file-loader/file-loader.component';
import { LayoutConfigComponent } from './layout-config/layout-config.component';
import { NotesConfigComponent } from './notes-config/notes-config.component';

@NgModule({
  declarations: [
    AppComponent,
    FileLoaderComponent,
    LayoutConfigComponent,
    NotesConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
