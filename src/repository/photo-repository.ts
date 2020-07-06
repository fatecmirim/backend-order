import { PhotoDb } from "../models";
import Photo from "../entity/photo";
import { ProductDb } from "../models/productDb";

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

  public async upload(newId: number, id: number): Promise<Photo> {
    const products = await ProductDb.findAll({ where: {photoId: id}});
    if (products) {
      await Promise.all(products.map(product => {
        product.photoId = newId;
        return product.save();
      }))
      const photo = await PhotoDb.findByPk(newId);
      return PhotoRepository.returnFromDatabase(photo);
    }
    throw new Error("Error uploading photo");
  }
}