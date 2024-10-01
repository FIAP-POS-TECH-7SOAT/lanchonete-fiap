import { Request, Response } from 'express';

class InfoController {
  async getInfo(req: Request, res: Response): Promise<Response> {
    /*
       #swagger.tags = ['Info']
       #swagger.summary = 'Get Info'
     */

    return res.json({
      info: {
        version: '1.0.0',
      },
    });
  }
}

export const infoController = new InfoController();
