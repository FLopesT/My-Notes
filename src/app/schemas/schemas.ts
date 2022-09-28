export const NOTES_SCHEMA_LITERAL = {
  title: 'notes schema',
  description: 'anotações',
  version: 0,
  keyCompression: true,
  primaryKey: 'noteId',
  type: 'object',
  properties: {
    noteId: { type: 'string' },
    noteName: { type: 'string' },
    hour: { type: 'string' },
    dateNumber: { type: 'number' },
    dateString: { type: 'string' },
    content: { type: 'string' },
    contentPreview: { type: 'string' },
    comments: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          commentId: { type: 'string' },
          content: { type: 'string', minlength: 1 },
          dateNumber: { type: 'number' },
          dateString: { type: 'string' },
          hour: { type: 'string' },
          creator: { type: 'string' },
        },
      },
    },
    subNotes:{
      type:'array',
      items:{
        type:'object',
        properties:{
          subNoteId:{type:'string'},
          subNoteName:{type:'string'},
          hour:{type:'string'},
          dateNumber:{type:'number'},
          dateString:{type:'string'},
          content:{type:'string'},
          contentPreview:{type:'string'},
          comments: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                commentId: { type: 'string' },
                content: { type: 'string', minlength: 1 },
                dateNumber: { type: 'number' },
                dateString: { type: 'string' },
                hour: { type: 'string' },
                creator: { type: 'string' },
              },
            },
          }
        }
      }
    },
    creator: { type: 'string' },
    private: { type: 'boolean' },
  },
  required: [
    'noteId',
    'noteName',
    'hour',
    'dateNumber',
    'dateString',
    'content',
    'contentPreview',
    'comments',
    'creator',
    'private',
    'subNotes'
  ],
} as const;

export const USERS_SCHEMA_LITERAL = {
  title: 'users schema',
  description: 'usuarios',
  version: 0,
  keyCompression: true,
  primaryKey: 'userName',
  type: 'object',
  properties: {
    userName: { type: 'string', minLength: 5 },
    name: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string', maxLength: 80 },
    password: { type: 'string', minLength: 8 },
    notes: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: ['userName', 'name', 'lastName', 'email', 'password', 'notes'],
  encrypted: ['password'],
}; //as const

export const RECENTNOTES_SCHEMA_LITERAL = {
  title: 'recentNote schema',
  description: 'anotações recentes',
  version: 0,
  keyCompression: true,
  primaryKey: 'banco',
  type: 'object',
  properties: {
    banco: { type: 'string' },
    notes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          dateNumber: { type: 'number' },
        },
      },
    },
  },
  required: ['banco', 'notes'],
} as const;
