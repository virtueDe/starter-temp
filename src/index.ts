import { checkImgExists, drawRoundedRect, base64ToFile } from './utils/index'

type coverType = 'redEnvelope' | 'displayRack' | 'rollUpBanner'

interface CoverDataItem {
  url: string
  x: number
  y: number
  width: number
  height: number
  radius: number
}

const coverData = {
  redEnvelope: {
    url: 'https://resources.laihua.com/2022-5-6/d26c2b20-cd1e-11ec-9b1e-a355df6e9a2f.png',
    x: 36,
    y: 52,
    width: 348,
    height: 464,
    radius: 4,
  },
  displayRack: {
    url: 'https://resources.laihua.com/2022-5-6/f40b3190-cd1e-11ec-9b1e-a355df6e9a2f.png',
    x: 36,
    y: 40,
    width: 348,
    height: 870,
    radius: 0,
  },
  rollUpBanner: {
    url: 'https://resources.laihua.com/2022-5-7/c5939d10-cdab-11ec-9b1e-a355df6e9a2f.png',
    x: 36,
    y: 52,
    width: 348,
    height: 782,
    radius: 0,
  },
}

// interface coverImageParams {
//   coverType: coverType
//   coverImgUrl: string
// }
class CoverImage {
  private ImgEl: HTMLImageElement = document.createElement('img')
  private overlayImgEl: HTMLImageElement = document.createElement('img')
  private canvas: HTMLCanvasElement = document.createElement('canvas')
  private ctx: CanvasRenderingContext2D = this.canvas.getContext('2d') as CanvasRenderingContext2D
  coverType: coverType = 'redEnvelope'
  coverImgUrl = ''
  url = ''
  // private params: coverImageParams = {
  //   coverType: coverType
  //   coverImgUrl: string
  // }
  private coverDataItem: CoverDataItem = {
    url: 'https://resources.laihua.com/2022-5-6/d26c2b20-cd1e-11ec-9b1e-a355df6e9a2f.png',
    x: 36,
    y: 52,
    width: 348,
    height: 464,
    radius: 4,
  }
  // constructor(params: coverImageParams) {
  //   this.params = params
  //   this.coverDataItem = coverData[this.params.coverType]
  //   this.init()
  // }

  private async check() {
    if (!this.coverDataItem) {
      throw new Error("COVERIMAGE: Please check if the 'coverType' is valid.")
    }
    try {
      await checkImgExists(this.overlayImgEl, this.coverImgUrl)
    } catch (error) {
      throw new Error("COVERIMAGE: Please check if the 'coverImgUrl' is valid.")
    }
  }

  private async draw() {
    await checkImgExists(this.ImgEl, this.coverDataItem.url)
    this.canvas.width = this.ImgEl.width
    this.canvas.height = this.ImgEl.height
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawImage(this.ImgEl, 0, 0)
  }

  private async drawOverlay() {
    await checkImgExists(this.overlayImgEl, this.coverImgUrl)
    await drawRoundedRect(
      this.ctx,
      this.coverDataItem.x,
      this.coverDataItem.y,
      this.coverDataItem.width,
      this.coverDataItem.height,
      this.coverDataItem.radius
    )
    await this.ctx.clip()
    await this.ctx.drawImage(this.overlayImgEl, this.coverDataItem.x, this.coverDataItem.y, this.coverDataItem.width, this.coverDataItem.height)
  }

  async getCoverImageUrl(type: coverType, url: string) {
    this.coverType = type
    this.coverImgUrl = url
    this.coverDataItem = coverData[this.coverType]
    await this.check()
    await this.draw()
    await this.drawOverlay()
    this.url = this.canvas.toDataURL(`image/png`, 1.0)
    return this.url
  }

  toFile(url: string) {
    return base64ToFile(url || this.url, 'png')
  }
}

export default new CoverImage()
