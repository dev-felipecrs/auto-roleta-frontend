import { BalanceTrack, Prisma, Status } from '@prisma/client'

import type { Color, User } from '@/types'
import { prisma } from '@/config/prisma'
import { getUserByEmail } from '@/actions'

import { API } from '.'

interface Operation {
  color: Color
}

interface OperationResponse {
  success: boolean
}

export class Bot {
  private API: API

  private async getUser(): Promise<User> {
    const user = await getUserByEmail(this.user.email)

    return user
  }

  private async updateUser(data: Prisma.UserUpdateInput): Promise<void> {
    await prisma.user.update({
      where: {
        email: this.user.email,
      },
      data,
    })
  }

  public constructor(private user: User) {
    this.API = new API()
  }

  public async init(): Promise<boolean> {
    const connected = await this.API.connect()

    if (!connected) {
      await this.updateUser({
        isActive: false,
        status: 'offline',
      })

      return false
    }

    console.log({
      index: 1,
      balance: this._balance,
      APIBalance: this.API.balance,
    })

    await this.updateUser({
      balance: this.API.balance,
    })

    return true
  }

  public async isActive(): Promise<boolean> {
    const user = await this.getUser()
    return user.isActive
  }

  private _balance: number = this.user.balance || 0

  private changeBalance(change: number): void {
    console.log({ called: true, change })

    this._balance += change
  }

  private _balance_track: BalanceTrack[] = this.user.balanceTracks

  get balanceTrack() {
    return this._balance_track
  }

  private async addBalanceTrack(track: BalanceTrack): Promise<void> {
    const user = await this.getUser()

    const balanceTrack = user.balanceTracks
    balanceTrack.push(track)

    this._balance_track = balanceTrack
  }

  private checkStop(): 'stop-win' | 'stop-loss' | 'no-balance' | null {
    const balance = this._balance

    if (this.user.config) {
      if (balance >= this.user.config.stopWin) {
        return 'stop-win'
      }

      if (balance <= this.user.config.stopLoss) {
        return 'stop-loss'
      }

      if (balance < this.user.config.entry) {
        return 'no-balance'
      }
    }

    return null
  }

  public async operate({ color }: Operation): Promise<OperationResponse> {
    const gales = this.user.config!.gales

    for (let gale = 0; gale <= gales; gale++) {
      const isActive = await this.isActive()

      if (!isActive) {
        console.log({ stoped: true, reason: 'bot is not active', isActive })

        return {
          success: false,
        }
      }

      const price = 2 ** gale * this.user.config!.entry

      if (this._balance < price) {
        console.log({
          stoped: true,
          reason: 'Saldo insuficiente',
          balance: this._balance,
          price,
        })

        await this.updateUser({
          isActive: false,
          status: 'offline',
        })

        return {
          success: false,
        }
      }

      console.log({ balance: this._balance, price })

      this.changeBalance(-price)

      console.log({ newBalance: this._balance })

      const track = await prisma.balanceTrack.create({
        data: {
          userId: this.user.userId,
          value: this._balance,
          time: new Date(),
        },
      })

      await this.addBalanceTrack(track)

      await this.updateUser({
        status: 'operating',
        balance: this._balance,
      })

      const result = await this.API.bet({
        color,
        amount: price,
      })

      console.log({ user: this.user.email, result })

      if (!result.success) {
        return {
          success: false,
        }
      }

      this.changeBalance(price)

      if (result.result !== false) {
        const track = await prisma.balanceTrack.create({
          data: {
            userId: this.user.userId,
            value: this._balance,
            time: new Date(),
          },
        })

        await this.addBalanceTrack(track)
      }

      const stop = this.checkStop()
      const toStop = result.result || !!stop

      let is_active = !stop
      let status: Status = toStop ? 'analyzing' : 'operating'

      if (!result.result && gale === gales) {
        status = 'analyzing'
      }

      if (!is_active) {
        status = 'offline'
      }

      const manuallyDeactivated = !(await this.isActive())
      is_active = is_active && !manuallyDeactivated

      if (manuallyDeactivated) {
        status = 'offline'
      }

      await this.updateUser({
        isActive: is_active,
        status,
        balance: this._balance,
      })

      if (toStop) {
        break
      }
    }

    this.API.disconnect()

    return {
      success: true,
    }
  }
}
