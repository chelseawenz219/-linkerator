const linkRouter = require('express').Router();

const {getAllLinks, createLink, updateLink, deleteLink } = require("../db/index");


linkRouter.get('/', async (req, res, next)=>{
    try {
        const links = await getAllLinks();
        res.send(links);
    } catch (error) {
        next(error);
    }
});

linkRouter.post('/', async (req, res, next)=>{
    try {
        const { link_url, comment } = req.body;
        const link = await createLink({
            link_url: link_url,
            click_count: 0,
            comment: comment
        });
        res.send({link});
    } catch (error) {
        next(error);
    }
});

linkRouter.patch('/:linkId', async (req, res, next)=>{
    try{
        const { link_url, comment } = req.body;
        await updateLink({
            linkId: req.params.linkId,
            link_url: link_url,
            comment: comment
        });
        res.send("Updated the Link!");
    }catch (error){
        next(error);
    }
    
});

linkRouter.delete('/:linkId', async (req, res, next)=>{
    try {
        await deleteLink(req.params.linkId);
        res.send("Successful Delete!");
    } catch (error) {
        next(error);
    }
});

module.exports = linkRouter;