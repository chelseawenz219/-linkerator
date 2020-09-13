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

tagsRouter.patch('/:linkId/:tagId', async (req, res, next)=>{
    try {
        await addTagLink({
            tagId: req.params.tagId,
            linkId: req.params.linkId
        });
        const linkWtag = await getLinkById(req.params.linkId);
        res.send("Added Tag To Link!", linkWtag);
    } catch (error) {
        next(error);
    }
});

tagsRouter.delete('/:linkId/:tagId', async (req, res, next)=>{
    try {
        await removeTagLink({
            tagId: req.params.tagId,
            linkId: req.params.linkId
        });
        const linkWOtag = await getLinkById(req.params.linkId);
        res.send("Removed tag from link:", linkWOtag);
    } catch (error) {
        next(error);
    }
});