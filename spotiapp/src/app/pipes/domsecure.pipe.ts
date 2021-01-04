import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';

@Pipe({
  name: 'domsecure'
})
export class DomsecurePipe implements PipeTransform {

    constructor(private domSanitizer:DomSanitizer){}
  transform( url:any): unknown {
    return this.domSanitizer.bypassSecurityTrustResourceUrl( url  );
  }

}
