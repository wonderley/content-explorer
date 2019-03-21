
class Utils {
  static ytThumbnailUrlForID(id) {
    // https://gist.github.com/protrolium/8831763
    return `http://img.youtube.com/vi/${id}/mqdefault.jpg`;
  }

  static ytIDForUrl(url) {
    if (!url) throw new Error('Invalid Url');
    const preceedingString = 'watch?v=';
    const index = url.indexOf(preceedingString);
    if (index === -1) throw new Error('No Url ID found');
    return url.substring(index + preceedingString.length);
  }

  static ytThumbnailUrlForUrl(url) {
    const id = Utils.ytIDForUrl(url);
    return Utils.ytThumbnailUrlForID(id);
  }
}

export default Utils;