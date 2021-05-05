import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FileLoaderComponent} from './file-loader/file-loader.component';
import {LayoutConfigComponent} from './layout-config/layout-config.component';
import {NotesConfigComponent} from './notes-config/notes-config.component';
import {MidimapComponent} from './midimap/midimap.component';

const routes: Routes = [
  { path: '', component: LayoutConfigComponent },
  { path: 'notes', component: NotesConfigComponent },
  { path: 'file', component: FileLoaderComponent },
  { path: 'midimap', component: MidimapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
