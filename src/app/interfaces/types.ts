export interface addNoteForm {
  noteName: string;
  content: string;
  private: boolean;
}

export interface addSubNoteForm {
  subNoteName: string;
  content: string;
}

export interface loginType {
  userName: string;
  password: string;
}

export interface lRResponse {
  resp: boolean;
  err: number;
}

export interface RecentNotes {
  banco: string;
  notes: Array<{id:string,dateNumber:number}>;
}

export interface addNoteFormTypes {
  noteId: string;
  noteName: string;
  hour: string;
  dateNumber: number;
  dateString: string;
  content: string;
  contentPreview: string;
  comments:any; //tive que deixar any pois deu cagada de tipagem
  subNotes: any;
  creator: string;
  private: boolean;
}

export interface addSubNoteFormTypes {
  subNoteId: string;
  subNoteName: string;
  hour: string;
  dateNumber: number;
  dateString: string;
  content: string;
  contentPreview: string;
  comments:any;
}

export interface commentType{
  commentId:string;
  content:string;
  dateNumber:number;
  dateString:string;
  hour:string;
  creator:string;
}

export interface registerFormTypes {
  userName: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  notes: Array<string>;
}

export interface addDateTypes {
  hour: string;
  dateNumber: number;
  dateString: string;
}

export interface recentNotesTypes{
  id:string;
  dateNumber:number
}

export interface privateResult{
  resp:boolean;
  creator:string | null;
}
