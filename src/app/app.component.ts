import { Component, Input, OnInit } from '@angular/core';
import 'zone.js/dist/zone-patch-rxjs';
import { NoteControllerService } from './services/controllers/note-controller.service';
import { UserControllerService } from './services/controllers/user-controller.service';
import { RxdbService } from './services/rxdbSetup/rxdb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //providers: [RxdbService]
})
export class AppComponent implements OnInit {
  public tudo: any = [];

  constructor(private f: RxdbService, private user: UserControllerService, private notes:NoteControllerService) {}

  ngOnInit() {
    //this.user.addNoteId('1fe54598-7cf0-40db-a8f9-09e4ce717bbc', 'flopest');

    //Mostra todos os documentos
    // this.f.db.usuarios
    //     .find()
    //     .exec()
    //    .then((doc) => doc.map((d) => this.tudo.push(d.toJSON())));
    //   console.log(this.tudo);

    //Remove o documento

    // this.f.db.usuarios.findOne("VastaNapa").exec()
    // .then(res=>{
    //   res?.remove();
    // })

    //remove tudo

    // this.f.db.anotacoes.find().exec()
    // .then(res=>{
    //   res.map(t=>t.remove())
    // })

    // this.f.db.usuarios.find().exec()
    // .then(res=>{
    //   res.map(t=>t.remove())
    // })

    //encontra o documento, aqui no caso estamos procurando
    //por uma chave que não é primária  console.dir(doc?.toJSON())

    // this.f.db.anotacoes
    //   .findOne(
    //     //findOne
    //     { selector: { noteName: 'Bom dia' } }
    //   )
    //   .exec()
    //   .then((doc) => {
    //     if (doc) console.log(doc.toJSON());
    //   });

    this.f.db.anotacoes.exportJSON().then(json => console.dir(json));
  }

}
