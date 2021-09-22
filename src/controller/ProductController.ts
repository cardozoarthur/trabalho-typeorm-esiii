import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import Product from "../models/Product";

export class UserController {
    
    private productRepository = async () => getRepository(Product);
    
    async get(req: Request, res: Response, next: NextFunction) {
        let repo = await this.productRepository();
        let { code, description, lovers, tags, id, __quantity } = req.query;
        if (id) {
          return res.json({product: (await repo.findOne({ where: { id } }))});
        };
        
        if (code) {
          return res.json({product: (await repo.findOne({ where: {code} }))});
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
          var products = await repo.find({ where: data });
        }

        if (!products) var products = await repo.find();

        if (__quantity) {
          products = products.filter((_, i) => i < Number(__quantity));
        };

        res.json({products: await repo.find()});
    }

    async post(req: Request, res: Response, next: NextFunction) {
        let repo = await this.productRepository();
        let { buyPrice, code, description, lovers, sellPrice, tags } = req.body;
        try {
          buyPrice = Number(buyPrice) *100;
          sellPrice = Number(sellPrice) *100;
          if (tags) tags = JSON.parse(tags);
          if (lovers) lovers = parseInt(lovers);
          const produto = repo.create({
            buyPrice,
            code,
            description,
            lovers,
            sellPrice,
            // tags,
          });
          repo.save(produto);
          res.status(201).json(produto);
        } catch (err) {
            console.error(err)
          return res.status(400).json({ Erro: err });
        }
    }
}