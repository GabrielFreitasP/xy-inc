export interface Point {
  coordX: number,
  coordY: number
}

const calculateDistance = (point1: Point, point2: Point): number => {
  const subX = point1.coordX - point2.coordX;
  const subY = point1.coordY - point2.coordY;
  
  const powX = Math.pow(subX, 2);
  const powY = Math.pow(subY, 2);

  const result = Math.sqrt(powX + powY);
  
  const distance = Math.abs(result);
  
  return distance;
}

export default calculateDistance;