import { MercuriusContext } from "mercurius";
import { UserDto } from "../dtos/user.dto";
import { toUserDto } from "../utils/mappers";

export default {
  Query: {
    getUsers: async (
      _: unknown,
      args: unknown,
      { dataSource: { userDataSource } }: MercuriusContext
    ): Promise<UserDto[]> => {
      const users = await userDataSource.getUsers();

      return users.map(toUserDto);
    },
  },
};
