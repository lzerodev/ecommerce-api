// class ProductFeatureListDTO {
//   nome: string;
//   descricao: string;
// }

// class ProductImageListDTO {
//   url: string;
//   descricao: string;
// }

export class ProductListDTO {
  constructor(
    readonly id: string,
    readonly name: string,
  ) {}
}
