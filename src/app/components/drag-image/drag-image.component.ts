import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drag-image',
  templateUrl: './drag-image.component.html',
  styleUrls: ['./drag-image.component.css'],
})
export class DragImageComponent implements OnInit {
  file!: any;
  dropArea = document.querySelector('.drag-image');
  dragText = document.querySelector('.titleTheDragDropFile');
  constructor() {}

  ngOnInit(): void {}

  clickTheInput() {
    (<HTMLInputElement>document.querySelector('.inputFile')).click();
  }

  checkTheChanges(e?: any) {
    this.file = e.files[0];
    (<HTMLElement>this.dropArea).classList.add('active');
    this.viewfile();
  }

  checkTheOver(event?: any) {
    event.preventDefault();
    (<HTMLElement>this.dropArea).classList.add('active');
    (<HTMLElement>this.dragText).textContent = 'Release to Upload File';
  }

  checkTheLeave() {
    (<HTMLElement>this.dropArea).classList.remove('active');
    (<HTMLElement>this.dragText).textContent = 'Drag & Drop to Upload File';
  }

  checkTheDrop(event?: any) {
    event.preventDefault();
    this.file = event.dataTransfer.files[0];
    this.viewfile();
  }

  viewfile() {
    let fileType = this.file.type;
    let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
    if (validExtensions.includes(fileType)) {
      let fileReader = new FileReader();
      fileReader.onload = () => {
        let fileURL = fileReader.result;
        let imgTag = `<img src="${fileURL}" alt="image">`;
        (<HTMLElement>this.dropArea).innerHTML = imgTag;
      };
      fileReader.readAsDataURL(this.file);
    } else {
      alert('This is not an Image File!');
      (<HTMLElement>this.dropArea).classList.remove('active');
      (<HTMLElement>this.dragText).textContent = 'Drag & Drop to Upload File';
    }
  }
}
