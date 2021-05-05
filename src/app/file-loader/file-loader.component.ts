import { Component, OnInit } from '@angular/core';
import {FileXmlService} from '../file-xml.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-file-loader',
  template: `
    <div class="flex items-center justify-center w-screen h-screen">
      <div class="text-center relative text-gray-500">
        <i class="fas fa-upload fa-5x"></i>
        <div class="mt-5 font-bold">Drop DrumGizmo <br> drumkit file </div>
        <input (change)="onLoad($event)" type="file" class="absolute w-full h-full top-0 left-0 opacity-0">
      </div>
    </div>
  `
})
export class FileLoaderComponent implements OnInit {

  constructor(private readonly fileXmlService: FileXmlService,
              private readonly router: Router) { }

  ngOnInit(): void {
  }

  onLoad(event: any): void {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.addEventListener('load', (e) => {
      const data = e.target.result;
      this.fileXmlService.setText(data.toString());
      this.router.navigateByUrl('/midimap');
    });

    reader.readAsText(file);
  }
}
