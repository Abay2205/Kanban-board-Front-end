import { Pipe, PipeTransform } from '@angular/core';
import {Tasks} from "./tasks";


@Pipe({
  name: 'textFilter'
})
export class TextFilterPipe implements PipeTransform {


  transform(tasks: Tasks[], text: string): Tasks[] {
    if(text == null || text == ''){
      return tasks;
    }
    return tasks.filter(p => p.taskName.includes(text) || p.description.includes(text) || p.status.includes(text) || p.developer.includes(text));
  }

}
