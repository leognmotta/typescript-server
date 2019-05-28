import { Schema, model, Document } from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { NextFunction } from 'express'

interface UserInterface extends Document {
  email: string
  firstName: string
  lastName: string
  password: string
  fullName(): string
}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      select: false
    }
  },
  {
    timestamps: true
  }
)

UserSchema.pre('save', async function (next: NextFunction) {
  if (this.isModified('password') || this.isNew) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
  }

  next()
})

UserSchema.methods.fullName = function (): string {
  return `${this.firstName} ${this.lastName}`
}

UserSchema.methods.getToken = function (): string {
  return jwt.sign({ userId: this._id }, process.env.SECRET, { expiresIn: '5h' })
}

export default model<UserInterface>('User', UserSchema)
