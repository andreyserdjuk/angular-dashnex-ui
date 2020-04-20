import { Component } from '@angular/core';
import { Papa, ParseResult } from 'ngx-papaparse';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  {
  name = 'Angular';
  file: File|null;
  csvData: string[][] = [["Name ","Rating","Feedback ","Image"],["Lorene ","5","I bought this for my 17 lb dog. This is the first harness that he seems to like. It fits him perfectly. The strap is adjustable. If you have a dog that is really good at getting out of harnesses, you may want this one. I love it! It is an amicable and excellent quality and above gift! A thousand thanks!",""],["Wade","5","Great product! I am impressed with this harness. I have walked with my dog today and it was really good! It's definitely worth the money! I love it.",""],["Daniel ","5","I got the size medium and it fit my dog perfectly. He wasn't able to fit in the other dog harness. The quality of the fabric is great and comfortable for my buddy. He loves to wear it. So far so good, I have no complaints.",""],["Christine T. ","5","Finally something that helps me control my 100 lb lab who gets so excited for walks that she pulls and chokes herself making walks not fun. This was a perfect alternative to the choke collars. This restrains her gently and is not uncomfortable for her to wear. The large size I got, I had to tighten it up to fit her better.",""],["Alexander","4","I love this harness. I saw my friend has one for her dog and decide to get one for my dog. It works really well for my dog - 75 lb. The quality is the same as the one I saw in the pet store but with half of the price. Great product and I love it.",""],["M. Turner","5","I love how you can adjust the size of the harness and how comfortable it is. At least I'm not worried about choking my dog. The handle is nice, because I can hold on the pup when other dogs walk by so I know nothing will happen.",""]];

  mapping = [
    {
        key: 'image',
        title: 'Link to image',
        required: false,
    },
    {
        key: 'rating',
        title: 'Rating (number)',
        required: true,
    },
    {
        key: 'content',
        title: 'Review content',
        required: true,
    },
    {
        key: 'firstName',
        title: 'First name',
        required: true,
    },
    {
        key: 'lastName',
        title: 'Last name',
        required: false,
    },
    {
        key: 'email',
        title: 'Email',
        required: false,
    },
    {
        key: 'createdAt',
        title: 'Created date and time',
        required: false,
    },
  ];

  step=2;
  steps=['IMPORT FILE', 'MATCH FIELDS', 'IMPORT PRODUCTS'];
  
  constructor(private papa: Papa) { }

  acceptFile(file: File) {
    if (file) {
      this.papa.parse(file, {
        complete: (result: ParseResult) => this.csvData = result.data
      });
    }
  }

  logMapped(mapping){
    console.log(mapping);
  }

  logSortDirection(sortDirection) {
    console.log('sortDirection', sortDirection);
  }
}
