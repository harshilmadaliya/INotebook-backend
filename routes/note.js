const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { check, validationResult } = require('express-validator');


//Route : 1 ==> get all user notes with this api => "/api/note/fetchallnotes"

router.get("/fetchallnotes", fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)
})


//Route : 2 ==> Add a new note with this api => "/api/addnote"

router.post("/addnotes", fetchuser, [
    check('titel', 'titel length should be 1 to 4 characters')
        .isLength({ min: 1 }),
    check('discription', 'discription should not be empty')
        .isLength({ min: 1 }),
    check('tag', 'tag should not be empty')
        .isLength({ min: 1 })
], async (req, res) => {
    const { title, discription, tag } = req.body
    const errors = validationResult(req);
    // console.log(errors)
    try {
        let note = new Notes({
            title, discription, tag, user: req.user.id
        })
        if(errors){
            let savenote = await note.save()
            res.json(savenote)
        }else{
            res.json(errors)
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
})


//Route : 3 ==> Updated a note with this api => "/api/updated:id"

router.put("/updated/:id", fetchuser, async (req, res) => {
    
    const { title, discription, tag } = req.body

    //Creat a new note object
    const newnote = {}
    if(title){newnote.title = title}
    if(discription){newnote.discription = discription}
    if(tag){newnote.tag = tag}

    
    //Find the note 
    let note =await Notes.findById(req.params.id)
    if(!note){ 
        return res.status(401).send("not found")
    }
    //Auth the user 
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("not Allowed")
    }
    //update note
    note = await Notes.findByIdAndUpdate(req.params.id , {$set : newnote} , {new : true})
    res.json({note})
})


//Route : 4 ==> Deleted a note with this api => "/api/deleted:id"

router.delete("/deleted/:id", fetchuser, async (req, res) => {
    
    const { title, discription, tag } = req.body

    //Find the note 
    let note =await Notes.findById(req.params.id)
    if(!note){ 
        return res.status(401).send("not found")
    }
    //Auth the user 
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("not Allowed")
    }
    //delete note
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({'Success': 'note was being deleted'})
})

module.exports = router 