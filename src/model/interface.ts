export default interface Brand {
    
}

export interface CartProductInfo {
    variant_name: string,
    variant_price: number,
    variant_sku: string,
    org_code: string,
    org_id: string,
    img_url: string,
}

export interface BrandProduct {
    [brandId: string]: Array<CartProductInfo>,
}

export interface BrandProductList {
    BrandProduct: Array<BrandProduct>,
}