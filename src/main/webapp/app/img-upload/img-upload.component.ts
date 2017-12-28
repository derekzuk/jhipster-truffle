import { Component } from '@angular/core';

@Component({
  selector: 'jhi-app-img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.css']
})
export class ImgUploadComponent {
  title = 'Image Upload';

  public url = require('../../content/images/rainbowskele.jpg');
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }

  submitImage() {
    console.log('in submitImage()');
//    console.log(event.target.files[0]);

//  var data = new Blob([byteArray], {type: "image/jpeg"});
//  saveAs(event.target.files[0], "testfile.jpg");
  }
}
