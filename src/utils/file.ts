import fs from 'fs';

export const deleteFile = async(filename: string): Promise<null> => {
    try {
        await fs.promises.stat(filename);
    } catch {
        return;
    }

    await fs.promises.unlink(filename);
}