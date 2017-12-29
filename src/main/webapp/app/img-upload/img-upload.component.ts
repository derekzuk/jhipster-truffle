import { Component } from '@angular/core';
import { ImageUploadService } from './img-upload.service';
import { ImageUpload } from './img-upload.model';

@Component({
  selector: 'jhi-app-img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.css']
})
export class ImgUploadComponent {
  title = 'Image Upload';
  url = require('../../content/images/rainbowskele.jpg');
  uploadedImage;

    constructor(
        private imageUploadService: ImageUploadService
    ) {}

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.uploadedImage = event.target.files[0];

      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }

  submitImage(event) {
    console.log('in submitImage() attempting to upload image:' + this.uploadedImage);
    console.log(this.uploadedImage);

    var imageModel = new ImageUpload(1, 'abc', 'crypto user string');

    this.imageUploadService.saveImage(imageModel);
  }
}
