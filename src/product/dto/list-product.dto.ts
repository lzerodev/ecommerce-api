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
    readonly features: ProductFeatureListDTO[],
    readonly images: ProductImageListDTO[],
  ) {}
}
