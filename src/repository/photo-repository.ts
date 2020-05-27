import { PhotoDb } from "../models";
import Photo from "../entity/photo";

export default class PhotoRepository {
  constructor() { }

  public static returnFromDatabase(row: any) {
    const photo: Photo = new Photo();
    if (row["id"]) {
      photo.id = row["id"];
    }
    if (row["path"]) {
      photo.path = row["path"];
    }
    if (row["url"]) {
      photo.url = row["url"];
    }
    return photo;
  }
  public async save(filename: string): Promise<Photo> {
    const photoSaved = await PhotoDb.create({ path: filename });
    if (photoSaved) {
      return PhotoRepository.returnFromDatabase(photoSaved);
    }
    throw new Error("Error saving photo");
  }

  public async upload(filename: string, id: number): Promise<Photo> {
    await PhotoDb.update({ path: filename }, { where: { id } });
    const photoUpdated = await PhotoDb.findByPk(id);
    if (photoUpdated) {
      return PhotoRepository.returnFromDatabase(photoUpdated);
    }
    throw new Error("Error uploading photo");
  }
}