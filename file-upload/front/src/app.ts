import { inject, autoinject } from 'aurelia-framework'
import { HttpClient } from 'aurelia-fetch-client'
import 'font-awesome/css/font-awesome.css'
@autoinject
export class App {
  message: String;
  savedImages: Array<any>;
  constructor(private http: HttpClient)
  {
    http.configure(config => {
      config.withBaseUrl('http://localhost:3000/');
    });
    this.http = http;
    this.message = 'Hello World!';
    this.savedImages = [];
  }

  submit(images)
  {
    let formData = new FormData();

    for(let i=0; i<images.length; i++)
    {
      formData.append('images', images[i]);
    }

    this.http.fetch('attachments', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
    })
    .catch(error => console.log(error));

  }

  deleteImage(image)
  {
    let index = this.savedImages.indexOf(image);
    if(index != -1)
    {
      this.savedImages.splice(index, 1);
    }
    
  }

  onFileChange(images)
  { 
    this.savedImages = [];
    for(let i=0; i<images.length; i++)
    {
      this.savedImages.push(images[i]);
    }
  }

}
