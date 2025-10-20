import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from './schemas/note.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  async create(ownerId: string, title: string, content?: string) {
    const note = new this.noteModel({
      owner: new Types.ObjectId(ownerId),
      title,
      content,
    });
    return note.save();
  }

  async findAllForUser(ownerId: string) {
    return this.noteModel
      .find({ owner: new Types.ObjectId(ownerId) })
      .sort({ updatedAt: -1 })
      .exec();
  }

  async findOne(ownerId: string, noteId: string) {
    const note = await this.noteModel
      .findOne({ _id: noteId, owner: new Types.ObjectId(ownerId) })
      .exec();
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  async update(ownerId: string, noteId: string, data: Partial<Note>) {
    const note = await this.noteModel
      .findOneAndUpdate(
        { _id: noteId, owner: new Types.ObjectId(ownerId) },
        data,
        { new: true }
      )
      .exec();
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  async remove(ownerId: string, noteId: string) {
    const res = await this.noteModel
      .findOneAndDelete({ _id: noteId, owner: new Types.ObjectId(ownerId) })
      .exec();
    if (!res) throw new NotFoundException('Note not found');
    return { deleted: true };
  }
}
