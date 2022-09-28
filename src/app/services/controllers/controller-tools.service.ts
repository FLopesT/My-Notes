import { Injectable, Input } from '@angular/core';
import { addDateTypes } from 'src/app/interfaces/types';

@Injectable({
  providedIn: 'root'
})
export class ControllerToolsService {

  constructor() {}

  public getDateFunction(): addDateTypes {
    function lengthCheck(item: string): string {
      if (item.length == 1) {
        item = `0${item}`;
      }
      return item;
    }
    const fullDate = new Date;
    //pegar string de data
    const ano: string = fullDate.getFullYear().toString();
    const day: string = lengthCheck(fullDate.getDate().toString());
    let month: string = (fullDate.getMonth() + 1).toString();
    month = lengthCheck(month);
    const dateString: string = `${day}-${month}-${ano.charAt(3)}${ano.charAt(
      2
    )}`;
    //pegar valor númerico de data
    const dateNumber: number = fullDate.valueOf();
    //pegar string de horas
    const minutes: string = lengthCheck(fullDate.getMinutes().toString());
    const hour: string = `${fullDate.getHours()}:${minutes}`;
    return {
      hour: hour,
      dateNumber: dateNumber,
      dateString: dateString,
    };
  }

  public getContentPreView(content: string): string {
    //se content tiver menos de 44 caracteres, usaremos ele mesmo no lugar de contentPreview
    let cont: string = '';
    if (content.length > 44) {
      cont = content.slice(0, 43);
      //se houver espaço antes de "...", será removido
      if (cont[cont.length - 1] == ' ') {
        cont.slice(0, cont.length - 1);
      }
      cont += '...';
    }
    return cont;
  }

  public ordemDeData(cl: any[]){
    cl.sort((a, b) => {
      if (a.dateNumber > b.dateNumber) return -1;
      return 0;
    });
    return cl;
  }
}
