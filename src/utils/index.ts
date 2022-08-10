// 检查图片地址是否有效
export const checkImgExists = (imgDom: HTMLImageElement, imgUrl: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    imgDom.src = imgUrl
    imgDom.setAttribute('crossOrigin', 'Anonymous')
    imgDom.onload = () => resolve()
    imgDom.onerror = () => reject()
  })
}

// 绘制圆角矩形
export const drawRoundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.arc(x + width - radius, y + radius, radius, 1.5 * Math.PI, 2 * Math.PI)
  ctx.lineTo(x + width, y + height - radius)
  ctx.arc(x + width - radius, y + height - radius, radius, 0, 0.5 * Math.PI)
  ctx.lineTo(x + radius, y + height)
  ctx.arc(x + radius, y + height - radius, radius, 0.5 * Math.PI, 1 * Math.PI)
  ctx.lineTo(x, y + radius)
  ctx.arc(x + radius, y + radius, radius, 1 * Math.PI, 1.5 * Math.PI)
}

export const base64ToFile = (base64: string, fileType: string) => {
  const data = base64.substring(base64.indexOf(',') + 1)
  const bstr = atob(data)
  const mime = `image/${fileType}`
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], 'thumbnail.' + fileType.toLowerCase(), {
    type: mime,
  })
}
