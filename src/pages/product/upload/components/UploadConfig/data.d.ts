export type UploadConfigType = {
  /**
   * 是否预售,true-预售商品，false-非预售商品
   */
  isPreSale: boolean;
  /**
   * 是否二手商品，true -二手商品 ，false-全新商品
   */
  secondHand: boolean;

  /**
   * 预售时间，isPreSale为true时必传，UNIX时间戳，只能为某一天的23:59:59
   */
  preSaleTime?: Date;
  /**
   * 商品复制之后：0：立即上架 1：放入草稿箱
   */
  uploadType: number;
  /**
   * 承诺发货时间（ 秒），普通、进口商品可选48小时或24小时；直邮、直供商品只能入参120小时；is_pre_sale为true时不必传
   */
  shipmentLimitSecond: number;
  /**
   * 是否7天无理由退换货，true-支持，false-不支持
   */
  isRefundable: boolean;
  /**
   * 是否支持假一赔十，false-不支持，true-支持
   */
  isFolt: boolean;

  titleMaxLength: number;
  titleDealType: number;
  addBefore: boolean;
  addBeforeWord?: string;
  addAfter: boolean;
  addAfterWord?: string;
  replace: boolean;
  delete: boolean;
  carouselRandom: boolean;
  carouselIndex: number;
  detailPicStart?: number;
  detailPicEnd?: number;
  carouselAddTen?: boolean;
  detailPicDelStart: number;
  detailPicDelEnd: number;
  groupPriceType: 1 | 2 | 3 | 4;
  groupPriceRate: number;
  singlePriceType: 1 | 2 | 3 | 4;
  singlePriceRate: number;
  marketPriceType: 1 | 2 | 3 | 4;
  marketPriceRate: number;
  filter: boolean;
  /**
   * 团购人数
   */
  customerNum: number;
  /**
   * 限购次数
   */
  buyLimit: number;

  stockConfig: 0 | 1;
  stockBase: number;
  lackStockBase: number;
  lackStockBase1: number;
  lackStockBase2: number;
  /**
   * 1-国内普通商品，
   * 2-进口，
   * 3-直供（保税），
   * 4-直邮 ,
   * 5-流量 ,
   * 6-话费 ,
   * 7-优惠券 ,
   * 8-QQ充值 ,
   * 9-加油卡，
   * 15-商家卡券，
   * 19-平台卡券
   */
  goodsType: 1 | 2;
  /**
   * 发货方式。0：无物流发货；1：有物流发货。
   */
  deliveryType: 0 | 1;
  /**
   * 物流运费模板ID，可使用pdd.logistics.template.get获取
   */
  costTemplateId?: number;
  randomTitle: boolean;
};

export const defaultUploadConfig: UploadConfigType = {
  isPreSale: false,
  secondHand: false,
  uploadType: 1,
  shipmentLimitSecond: 172800,
  isRefundable: true,
  isFolt: true,
  titleMaxLength: 60,
  titleDealType: 1,
  addBefore: true,
  addAfter: true,
  replace: true,
  delete: true,
  carouselRandom: true,
  carouselIndex: 1,
  carouselAddTen: true,
  detailPicDelStart: 1,
  detailPicDelEnd: 1,
  groupPriceType: 1,
  groupPriceRate: 0,
  singlePriceType: 1,
  singlePriceRate: 0,
  marketPriceType: 1,
  marketPriceRate: 0,
  filter: true,
  customerNum: 999,
  buyLimit: 999,
  stockConfig: 0,
  stockBase: 100,
  lackStockBase: 100,
  lackStockBase1: 10,
  lackStockBase2: 100,
  goodsType: 1,

  deliveryType: 1,
  randomTitle: true,
};
