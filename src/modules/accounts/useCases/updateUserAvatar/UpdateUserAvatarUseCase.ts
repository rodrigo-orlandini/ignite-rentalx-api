import { inject, injectable } from "tsyringe";

import { deleteFile } from "@utils/file";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
    userId: string;
    avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ userId, avatarFile }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(userId);

        if(user.avatar) {
            await deleteFile(`./tmp/avatar/${user.avatar}`);
        }

        await this.usersRepository.updateAvatar(userId, avatarFile);
    }
}

export { UpdateUserAvatarUseCase };