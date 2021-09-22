import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import ProductRepository from '../repositories/ProductRepository';

const productRouter = Router();
const productRepository = async () => getCustomRepository(ProductRepository);

productRouter.get('/', async (req, res) => {
  let { code, description, lovers, tags, id, __quantity } = req.query;
  if (id) {
    return res.json({product: (await (await productRepository()).findById(id))});
  };
  
  if (code) {
    return res.json({product: (await (await productRepository()).findByCode(code))});
  };
  
  let data: any = {};
  
  let buyPrice = req.body.buyPrice ? Number(req.body.buyPrice)*100 : undefined;
  let sellPrice = req.body.sellPrice ? Number(req.body.sellPrice)*100 : undefined;

  lovers = lovers ? <any> Number(lovers) : undefined;

  if (code) data.code = code;
  if (description) data.description = description;
  if (lovers) data.lovers = lovers;

  if (buyPrice) data.buyPrice = buyPrice;
  if (sellPrice) data.sellPrice = sellPrice;

  if (Object.keys(data).length > 0) {
    var products = await (await productRepository()).find({ where: data });
  }

  if (!products) var products = await (await productRepository()).find();

  if (__quantity) {
    products = products.filter((_, i) => i < Number(__quantity));
  };

  res.json({products});
});

productRouter.post('/', async (req, res) => {
  let { buyPrice, code, description, lovers, sellPrice, tags } = req.body;
  try {
    buyPrice = Number(buyPrice) *100;
    sellPrice = Number(sellPrice) *100;
    if (tags) tags = JSON.parse(tags);
    if (lovers) lovers = parseInt(lovers);
    const produto = (await productRepository()).create({
      buyPrice,
      code,
      description,
      lovers,
      sellPrice,
      // tags,
    });

    await (await productRepository()).save(produto);
    res.status(201).json(produto);
  } catch (err) {
    return res.status(400).json({ Erro: err.message });
  }
});

export default productRouter;
