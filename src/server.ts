import 'dotenv/config';
import mongoConfig from './config/mongo';
import mongoose from 'mongoose';
import app from './app';

class Server {

  constructor() {
    this.initServer();
  }

  async initServer() {
    await this.connectDatabase();

    app.listen(process.env.PORT || 3333, () => {
      console.log('Server listening on http://localhost:3333');
    });
  }

  private async connectDatabase() {
    try {
      let sSRV = '';
      let sPort = '';
      
      if (mongoConfig.local === true) {
        sPort = `:${mongoConfig.port}`;
      } else {
        sSRV = '+srv';
      }
      
      console.log('Connecting in Mongo DB...')
      await mongoose.connect(
        `mongodb${sSRV}://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.host}${sPort}/${mongoConfig.database}`, 
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false
        }
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export default new Server();
