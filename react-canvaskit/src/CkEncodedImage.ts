import { CanvasKit, Image as SkImage, Paint as SkPaint } from 'canvaskit-wasm'
import { isCkCanvas } from './CkCanvas'
import { toSkPaint } from './SkiaElementMapping'
import {
  CkElement,
  CkElementContainer,
  CkElementCreator,
  CkElementProps,
  CkObjectTyping,
  Paint,
} from './SkiaElementTypes'

export interface CkEncodedImageProps extends CkElementProps<never> {
  left: number
  top: number
  bytes: Uint8Array | ArrayBuffer
  // 添加图像的目标宽度和高度属性
  width?: number
  height?: number
  paint?: Paint
}

class CkEncodedImage implements CkElement<'ck-encoded-image'> {
  readonly skObjectType: CkObjectTyping['ck-encoded-image']['name'] = 'SkImage'
  readonly type: 'ck-encoded-image' = 'ck-encoded-image'
  deleted = false

  private readonly defaultPaint: SkPaint
  private renderPaint?: SkPaint

  private image?: SkImage

  constructor(readonly canvasKit: CanvasKit, readonly props: CkObjectTyping['ck-encoded-image']['props']) {
    this.defaultPaint = new this.canvasKit.Paint()
    this.defaultPaint.setStyle(this.canvasKit.PaintStyle.Fill)
    this.defaultPaint.setAntiAlias(true)
  }

  delete(): void {
    if (this.deleted) {
      return
    }

    this.image?.delete()
    this.defaultPaint.delete()
    this.renderPaint?.delete()
    this.deleted = true
  }

  render(parent: CkElementContainer<any>): void {
    if (this.deleted) {
      throw new Error('BUG. line element deleted.')
    }

    if (parent && isCkCanvas(parent)) {
      this.image = this.canvasKit.MakeImageFromEncoded(this.props.bytes) ?? undefined
      if (this.image) {
        this.renderPaint?.delete()
        this.renderPaint = toSkPaint(this.canvasKit, this.props.paint)
        // 判断是否设置了width和height属性，设置目标尺寸
        const dstRect = this.props.width !== undefined && this.props.height !== undefined
          ? this.canvasKit.XYWHRect(this.props.left, this.props.top, this.props.width, this.props.height)
          : undefined;

        if (dstRect) {
          parent.skObject?.drawImageRect(
            this.image,
            dstRect,
            dstRect,
            this.renderPaint ?? this.defaultPaint
          )
        } else {
          // 如果没有设置宽度和高度，则正常绘制图像
          parent.skObject?.drawImage(
            this.image,
            this.props.left,
            this.props.top,
            this.renderPaint ?? this.defaultPaint
          )
        }
      }
    }
  }
}

export const createCkEncodedImage: CkElementCreator<'ck-encoded-image'> = (type, props, canvasKit) =>
  new CkEncodedImage(canvasKit, props)
