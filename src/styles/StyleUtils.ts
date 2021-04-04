class StyleUtils {
  static getRandomGradientStyle(position: number) {
    const remainder3 = position % 3;
    const remainder2 = position % 2;

    if (remainder3 === 0) {
      return 'from-purple-500 to-indigo-500';
    }

    if (remainder2 === 0) {
      return 'from-pink-500 to-rose-500';
    }

    return 'from-yellow-400 to-orange-500';
  }
}

export default StyleUtils;
