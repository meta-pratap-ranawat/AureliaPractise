import { inject, autoinject } from 'aurelia-framework'
import { HttpClient } from 'aurelia-fetch-client'
@autoinject
export class App {
  message = 'Hello World!';
  constructor(private http: HttpClient)
  {
    http.configure(config => {
      config.withBaseUrl('http://localhost:3000/');
    });
    this.http = http;
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
    .then(data => console.log(data.message))
    .catch(error => console.log(error));
  }

}
