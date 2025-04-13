import { Query } from "../model/model";
import { env } from "../utils/env";

export default {
  Query: {
    config: (): Promise<Query["config"]> => {
      return Promise.resolve({
        photoBucketUrl: env.PHOTOS_BUCKET_URL,
      });
    },
  },
};
