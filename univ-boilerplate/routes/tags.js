const tagsRouter = require('express').Router();

const {getTags, getTagsByLink, addTagLink, getLinkById, removeTagLink} = require("../db");


tagsRouter.get('/', async (req, res, next)=>{
    try {
        const tags = await getTags();
        res.send(tags);
    } catch (error) {
        next(error);
    }
});

tagsRouter.get('/:linkId', async (req, res, next)=>{
    try {
        const linktags = await getTagsByLink(req.params.linkId);
        res.send(linktags);
    } catch (error) {
        next(error);
    }
});

tagsRouter.post('/:tagId/:linkId', async (req, res, next)=>{
    try {
        await addTagLink({
            tagId: req.params.tagId,
            linkId: req.params.linkId
        });
        res.send("Successful Tag-Link!");
    } catch (error) {
        console.error(error);
    }
});

tagsRouter.delete('/:tagId/:linkId', async (req, res, next)=>{
    try {
        await removeTagLink({
            tagId: req.params.tagId,
            linkId: req.params.linkId
        });
        res.send("Successful Tag-Un-Link!");
    } catch (error) {
        next(error);
    }
});

module.exports = tagsRouter;