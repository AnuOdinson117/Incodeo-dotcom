import { Permission } from 'node-appwrite'
import { commentCollection, db } from '../name'
import { databases } from './config'

export default async function createCommentCollection() {
    await databases.createCollection(db, commentCollection, commentCollection, [
        Permission.create('users'),
        Permission.read('any'),
        Permission.read('users'),
        Permission.update('users'),
        Permission.delete('users'),
    ])
    console.log('Comment Collection has been created')

    await Promise.all([
        databases.createStringAttribute(db, commentCollection, 'content', 10000, true),
        databases.createEnumAttribute(db, commentCollection, 'type', ['answer', 'question'], true),
        databases.createStringAttribute(db, commentCollection, 'typeID', 50, true),
        databases.createStringAttribute(db, commentCollection, 'authorID', 50, true),
    ])
    console.log('Comment Attributes has been created')
}