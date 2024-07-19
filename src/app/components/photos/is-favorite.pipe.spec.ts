import { IsFavoritePipe } from './is-favorite.pipe';

describe('IsFavoritePipe', () => {
  let pipe: IsFavoritePipe;

  beforeEach(() => {
    pipe = new IsFavoritePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true if the number is included in the array', () => {
    expect(pipe.transform(1, [1, 2, 3])).toBe(true);
  });

  it('should return false if the number is not included in the array', () => {
    expect(pipe.transform(4, [1, 2, 3])).toBe(false);
  });
});
