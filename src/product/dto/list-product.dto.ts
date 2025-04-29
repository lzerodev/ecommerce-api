class ProductFeatureListDTO {
  name: string;
  description: string;
}

class ProductImageListDTO {
  url: string;
  description: string;
}

export class ProductListDTO {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly features?: ProductFeatureListDTO[],
    readonly images?: ProductImageListDTO[],
  ) {
    if (features) {
      this.features = features.map((feature) => ({
        name: feature.name,
        description: feature.description,
      }));
    }
    if (images) {
      this.images = images.map((image) => ({
        url: image.url,
        description: image.description,
      }));
    }
  }
}
