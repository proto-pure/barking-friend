const host = process.env.REACT_APP_REMOTE_HOST || 'https://dog.ceo';

/**
 * A class that provides methods of data delivery and caching
 */
class ReqCache {
  constructor() {
    this.cacheName = 'barking-friend-cache';
  }

  /**
   * Gets data from cache
   * @param {string} url
   */
  async getCachedData(url) {
    const cacheStorage = await caches.open(this.cacheName);
    const cacheData = await cacheStorage.match(url);

    return !cacheData || !cacheData.ok ? false : await cacheData.json();
  }

  /**
   * Makes an API request to get data from the server
   * and put it in the cache.
   * @param {string} url
   */
  async getNewData(url) {
    const response = await fetch(url);
    const cacheStorage = await caches.open(this.cacheName);
    await cacheStorage.put(url, response);

    return await this.getCachedData(url);
  }

  /**
   * Gets data from cache, if available, if not, makes
   * API call to get data
   * @param {string} url
   */
  async getData(url) {
    const cacheData = await this.getCachedData(url);
    const data = cacheData || (await this.getNewData(url));

    return data;
  }

  /**
   * Deletes cache
   */
  deleteCache() {
    caches.delete(this.cacheName);
  }
}

/**
 * Gets the list of breeds, runs the internal functions of
 * the `ReqCache` class and uses the cached data if available,
 * if not, makes an API request to the server to get the list of
 * breeds and caches the result for future use
 * @returns Object with breeds
 */
export const getBreedsList = async () => {
  const reqCache = new ReqCache();

  /** @type {APIResponseBreeds} */
  const data = await reqCache.getData(`${host}/api/breeds/list/all`);

  return data.status === 'success' ? data.message : null;
};

/**
 * Gets the list of breeds images
 * @param {Object} params Params object
 * @param {string | undefined} params.breed Breed
 * @param {string | undefined} params.subBreed Sub breed
 * @param {number | undefined} limit Limit the results we are going to render
 */
export const getBreedImages = async (params, limit) => {
  const reqCache = new ReqCache();
  const breed = params.breed;
  const subBreed = params.subBreed ? params.subBreed + '/' : '';
  const url = `${host}/api/breed/${breed}/${subBreed}images`;

  /** @type {APIResponseBreedsImages} */
  const data = await reqCache.getData(url);
  return data.status === 'success' ? data.message.slice(0, limit) : null;
};

/**
 * Adds or removes the URLs of the breeds images in the
 * data structure we use in the `Favorites` section
 * @param {string[]} favorites The array with the URLs of breeds images used in `Favorites`
 * @param {string} image The URL of the breed image we are going to work with
 */
export const handleImageInFavorites = (favorites, image) => {
  let updatedFavorites;
  const isAdded = favorites.includes(image);

  if (isAdded) {
    updatedFavorites = favorites.filter(item => item !== image);
  } else {
    updatedFavorites = [...favorites, image];
  }

  localStorage.setItem('favorite_breeds', JSON.stringify(updatedFavorites));
  return updatedFavorites;
};

/**
 * Splits an array of breeds into groups of a certain number of
 * @param {string[]} breeds Array of breeds IDs
 * @param {number} groupBy Splits the array of breeds IDs by the given number
 */
export const arrayChunks = (breeds, groupBy) => {
  const chunks = [];
  const clone = [...breeds];
  const length = Math.ceil(clone.length / groupBy);

  for (let i = 0; i < length; i++) {
    chunks.push(clone.splice(0, groupBy));
  }

  return chunks;
};
