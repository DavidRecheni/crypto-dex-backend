import { CanvasRenderingContext2D, createCanvas, Image } from 'canvas';
import AvatarPartSlot from '../types/AvatarPartSlot';

function createContext() {
  const canvas = createCanvas(200, 600);
  return { canvas, ctx: canvas.getContext('2d') };
}

function addAvatarPiece(
  partName: AvatarPartSlot,
  partImage: string,
  canvasContext:CanvasRenderingContext2D,
) {
  const partsAxis = {
    head: { x: 0, y: 0 },
    body: { x: 0, y: 200 },
    pants: { x: 0, y: 400 },
  };
  const img = new Image();
  img.onload = () => canvasContext.drawImage(img, partsAxis[partName].x, partsAxis[partName].y);
  img.onerror = (err:any) => { throw err; };
  img.src = partImage;
}

function generateAvatar(headImage: string, bodyImage: string, pantsImage: string) {
  const { canvas, ctx } = createContext();
  addAvatarPiece('head', headImage, ctx);
  addAvatarPiece('body', bodyImage, ctx);
  addAvatarPiece('pants', pantsImage, ctx);
  return canvas.toDataURL();
}

export default generateAvatar;
