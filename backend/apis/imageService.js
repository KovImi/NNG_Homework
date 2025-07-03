
module.exports = {
  async getImageByName(params) {
    const name = params && params.name ? params.name : '';
    if (!name || typeof name !== 'string') {
      return { success: false, error: 'Missing or invalid "name" parameter.' };
    }
    const url = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(name)}`;
    return { success: true, result: url };
  }
};
