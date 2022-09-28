import { Injectable } from '@angular/core';

//modulos rxdb
import { createRxDatabase, getRxStoragePouch, addPouchPlugin, addRxPlugin  } from 'rxdb';
import { RxDBEncryptionPlugin } from 'rxdb/plugins/encryption';
import { RxDBJsonDumpPlugin } from 'rxdb/plugins/json-dump';

//database types
import {
  MyNotesDb,
  MyNotesDbCollections,
  NOTES_SCHEMA,
  RECENTNOTES_SCHEMA,
  USERS_SCHEMA,
} from '../../rxdbTypes';

async function loadRxDBPlugins(): Promise<void> {
  addPouchPlugin(require('pouchdb-adapter-idb'));
  addPouchPlugin(require('pouchdb-adapter-http'));
  addRxPlugin(RxDBEncryptionPlugin);
  addRxPlugin(RxDBJsonDumpPlugin);
}

async function databaseCreator(): Promise<MyNotesDb> {
  await loadRxDBPlugins();

  const myNotesDb: MyNotesDb = await createRxDatabase<MyNotesDbCollections>({
    name: 'db',
    storage: getRxStoragePouch('idb'),
    password: '12345678'
  });

  await myNotesDb.addCollections({
    usuarios: {
      schema: USERS_SCHEMA,
    },
    anotacoes: {
      schema: NOTES_SCHEMA,
    },
    recentes: {
      schema: RECENTNOTES_SCHEMA
    }
  });

  // await myNotesDb.recentes.remove()
  // await myNotesDb.anotacoes.remove()
  // await myNotesDb.usuarios.remove()

  await myNotesDb.recentes.find().exec()
  .then((res) => {
    if(res.length == 0){
      addRecentNotes(myNotesDb);
     }
  });

  await myNotesDb.anotacoes.find().exec()
  .then((res) => {
    if(res.length == 0){
      addNotes(myNotesDb);
    }
  });

  await myNotesDb.usuarios.find().exec()
  .then((res) => {
   if(res.length == 0){
    addUsers(myNotesDb);
   }
  });

  return myNotesDb;
}

async function addRecentNotes(myNotesDb:MyNotesDb) {
  await myNotesDb.recentes.insert({
     banco:"unic",
     notes:[{id:'1',dateNumber:1653920173830},
     {id:'2',dateNumber:1653920521357},
     {id:'3',dateNumber:1653920630994}]
   })
}

async function addNotes(myNotesDb:MyNotesDb){
  await myNotesDb.anotacoes.bulkInsert([
    {
      noteId:"1",
      noteName:"Bem gerado",
      hour:"11:16",
      dateNumber:1653920173830,
      dateString:"30-05-22",
      content:"Foi muito bem gerado para fazer testes.",
      contentPreview:"Foi muito bem gerado para fazer testes.",
      comments:[
         {
           commentId:'1',
           content:'Caramba! Foi bem gerado mesmo kkkk.',
           dateNumber:1653920173830,
           dateString:'30-05-22',
           hour:'11:16',
           creator:"mno45"
         },
         {
           commentId:'2',
           content:'Que bom que gostou :D',
           dateNumber:1653920173831,
           dateString:'30-05-22',
           hour:'11:16',
           creator:"flopest"
         }
       ],
      subNotes:[],
      creator:"flopest",
      private:false,
    },
    {
      noteId:"2",
      noteName:"Gerado do mno45",
      hour:"11:22",
      dateNumber:1653920521357,
      dateString:"30-05-22",
      content:"Foi mno45 bem gerado para fazer testes.",
      contentPreview:"Foi mno45 bem gerado para fazer testes.",
      comments:[
        {
           commentId:'1',
          content:'Caramba! Foi bem gerado mesmo kkkk.',
           dateNumber:1653920521357,
           dateString:'30-05-22',
          hour:'11:22',
           creator:"flopest"
         },
         {
           commentId:'2',
           content:'Que bom que gostou :D',
           dateNumber:1653920521358,
           dateString:'30-05-22',
           hour:'11:22',
           creator:"mno45"
         }
       ],
      subNotes:[],
      creator:"mno45",
      private:false,
    },
    {
      noteId:"3",
      noteName:"Gerado denovo",
      hour:"11:23",
      dateNumber:1653920630994,
      dateString:"30-05-22",
      content:"Já faz muitos anos que várias empresas apostam alto em suas próprias plataformas/launchers no PC, por exemplo, a Ubisoft conta com sua uPlay, temos também a Epic Games Store e não devemos esquecer da Origin da Electronic Arts, que está sofrendo mudanças.",
      contentPreview:"Já faz muitos anos que várias empresas apost...",
      comments:[
         {
           commentId:'1',
           content:'Caramba! Foi bem gerado mesmo kkkk.',
           dateNumber:1653920630994,
           dateString:'30-05-22',
           hour:'11:23',
           creator:"flopest"
         },
         {
           commentId:'2',
           content:'Que bom que gostou :D',
           dateNumber:1653920630995,
           dateString:'30-05-22',
           hour:'11:23',
           creator:"mno45"
         }
       ],
      subNotes:[],
      creator:"mno45",
      private:false,
    }
  ])
}

async function addUsers(myNotesDb:MyNotesDb) {
  await myNotesDb.usuarios.bulkInsert([
    {
      userName: 'flopest',
      name: 'felipe',
      lastName: 'toledo',
      email: 'flopest2@outlook.com',
      password: '12345678',
      notes:["1"]
    },
    {
      userName: 'mno45',
      name: 'manoel',
      lastName: 'silva',
      email: 'manoelmno45@outlook.com',
      password: '125hhhhfr54',
      notes:["2","3"]
    },
  ]);
}

let initState: null | Promise<any> = null;
let DB_INSTANCE: MyNotesDb;

export async function initDatabase(): Promise<void> {
  if (!initState) {
    console.log('initDatabase');
    initState = databaseCreator().then((db) => (DB_INSTANCE = db));
  }
  await initState;
}

@Injectable({
  providedIn: 'root',
})
export class RxdbService {
  constructor() {}
  get db(): MyNotesDb {
    return DB_INSTANCE;
  }
}
