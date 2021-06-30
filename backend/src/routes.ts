import express from 'express';

import * as homeController from '@controllers/home'

export const registerRoutes = (app: express.Application): void => {
        app.get('/', homeController.index);
}