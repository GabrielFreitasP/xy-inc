import CalculateDistance, { Point } from '../../src/utils/calculate-distance';

describe('Calculete Distance', () => {
  it('should be able to calculate the distance between two points', () => {
    const point1: Point = { coordX: 0, coordY: 0 };
    const point2: Point = { coordX: 3, coordY: 4 };

    const distance = CalculateDistance(point1, point2);

    expect(distance).toBe(5);
  });

  it('should be able to calculate the distance between two points with posite result', () => {
    const point1: Point = { coordX: 3, coordY: 4 };
    const point2: Point = { coordX: 0, coordY: 0 };

    const distance = CalculateDistance(point1, point2);

    expect(distance).toBe(5);
  });
});
