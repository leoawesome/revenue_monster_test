const { describe, it } = require('mocha');
const request = require('supertest');

const app = require('../../node_modules/@boxescms/server/app');

describe('GET /search?title=star', () => {
  it('OK, get the search comment with title = star', (done) => {
    try {
      const test = [
        {
          title: 'Star Wars: The Rise of Skywalker',
          description: 'The surviving Resistance faces the First Order once again as the journey of Rey, Finn and Poe Dameron continues. With the power and knowledge of generations behind them, the final battle begins.',
          filename: 'db32LaOibwEliAmSL2jjDF6oDdj.jpg',
          original_link: 'https://image.tmdb.org/t/p/w500/db32LaOibwEliAmSL2jjDF6oDdj.jpg',
        },
        {
          title: 'Star Wars: The Last Jedi',
          description: 'Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.',
          filename: 'kOVEVeg59E0wsnXmF9nrh6OmWII.jpg',
          original_link: 'https://image.tmdb.org/t/p/w500/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg',
        },
      ];

      request(app)
        .get('/api/search?title=star')
        .expect(200, {
          data: test,
        }, done);
      // assert(res.data, test);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });
});
