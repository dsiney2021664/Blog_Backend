import { response, request } from "express";
import Tarea from './tarea.model.js'
import Comment from '../Comments/Comment.model.js'

//Crear tarea
export const createTarea = async (req, res = response) => {
    const { title, description, imagenUrl, type } = req.body;

    try {
        const tarea = new Tarea({ title, description, imagenUrl, type });
        await tarea.save();
        res.status(201).json({
            msg: 'Tarea created successfully',
            tarea
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

//Crear Comentario
export const createComment = async (req, res) => {
    const { id } = req.params; 
    const { text, author } = req.body;

    try {
        const comment = new Comment({ text, author });
        await comment.save();

        const tarea = await Tarea.findById(id);
        if (!tarea) {
            return res.status(404).json({ msg: 'Tarea not found' });
        }

        tarea.comments.push(comment._id); 
        await tarea.save();

        res.status(201).json({
            msg: 'Comment added successfully',
            tarea,
            comment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};



//Buscar tareas
export const getTareas = async (req, res) => {
    try {
        const tareas = await Tarea.find().populate('comments');
        res.json(tareas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};


//Editar tarea
export const updateTarea = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const updateTarea = await Tarea.findByIdAndUpdate(id, { title, description }, { new: true });
        if (!updateTarea) {
            return res.status(404).json({
                msg: 'Tarea not found'
            });
        }
        res.json({
            msg: 'Tarea updated successfully',
            tarea: updateTarea,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
};

//Eliminar tarea
export const deleteTarea = async (req, res) => {
    const { id } = req.params;

    try{
        const deleteTarea = await Tarea.findByIdAndDelete(id);
        if(!deleteTarea) {
            return res.status(404).json({
                msg: 'Tarea not found'
            });
        }
        res.json({
            msg: 'Tarea deleted successfully',
            tarea: deleteTarea,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
};

