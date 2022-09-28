
import {
    RxDatabase,
    RxCollection,
    RxJsonSchema,
    RxDocument,
    toTypedRxJsonSchema,
    ExtractDocumentTypeFromTypedRxJsonSchema,
} from 'rxdb';

import {
    NOTES_SCHEMA_LITERAL,
    USERS_SCHEMA_LITERAL,
    RECENTNOTES_SCHEMA_LITERAL
} from './schemas/schemas';

const schemaTyped = toTypedRxJsonSchema(USERS_SCHEMA_LITERAL);
const schemaTyped1 = toTypedRxJsonSchema(NOTES_SCHEMA_LITERAL);
const schemaTyped2 = toTypedRxJsonSchema(RECENTNOTES_SCHEMA_LITERAL);
export type RxUsersDocumentType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>;
export type RxnotesDocumentType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped1>;
export type RxRecentNotesDocumentType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped2>;
export const USERS_SCHEMA: RxJsonSchema<any> = USERS_SCHEMA_LITERAL;
export const NOTES_SCHEMA: RxJsonSchema<RxnotesDocumentType> = NOTES_SCHEMA_LITERAL;
export const RECENTNOTES_SCHEMA : RxJsonSchema<RxRecentNotesDocumentType> = RECENTNOTES_SCHEMA_LITERAL;

export type UserDocument = RxDocument<RxUsersDocumentType>;
export type NoteDocument = RxDocument<RxnotesDocumentType>;
export type RecentNoteDocument = RxDocument<RxRecentNotesDocumentType>

export type UsersCollection = RxCollection<any>;
export type NotesCollection = RxCollection<RxnotesDocumentType>;
export type RecentNotesCollection = RxCollection<RxRecentNotesDocumentType>;
export type MyNotesDbCollections = {
    usuarios: UsersCollection,
    anotacoes: NotesCollection,
    recentes: RecentNotesCollection
}

export type MyNotesDb = RxDatabase<MyNotesDbCollections>;









