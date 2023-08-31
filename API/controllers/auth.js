import { AuthModel } from '../modules/auth.js'
import bycript from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'

export class AuthController {
  static async register (req, res) {
    const result = req.body
    try {
      console.log('<<<<<<<<<<<<<<<<<<<<', result.data)
      const passwordEncrypted = await bycript.hash(result.password, 10)

      if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }

      const newUser = await AuthModel.register({ user: result, passwordHash: passwordEncrypted })
      const token = await createAccessToken({ payload: newUser._id })

      res.cookie('token', token)
      res.status(201).json({
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        creadtedAt: newUser.createdAt,
        updatedAt: newUser.updatedAt
      })
    } catch (error) {
      console.error('Error in register:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  static async login (req, res) {
    const result = req.body
    try {
      if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }

      const userFound = await AuthModel.login({ email: result.email, username: result.username })
      if (!userFound) return res.status(404).json({ error: 'Usuario no encontrado' })

      const isMatched = await bycript.compare(result.password, userFound.password)
      if (!isMatched) return res.status(400).json({ message: 'Contraseña incorrecta' })

      const token = await createAccessToken({ id: userFound._id })

      res.cookie('token', token)
      res.status(201).json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        creadtedAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
      })
    } catch (error) {
      console.error('Error in register:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  static async logout (req, res) {
    res.cookie('token', '', {
      expires: new Date(0)
    })
    return res.sendStatus(200)
  }

  static async profile (req, res) {
    try {
      const userFound = await AuthModel.profile({ _id: req.user.id })

      if (!userFound) return res.status(400).json({ message: 'User not found' })

      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        creadtedAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
      })
    } catch (error) {
      console.error('Error in register:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
