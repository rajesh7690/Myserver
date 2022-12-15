import todo from "../model/todo.js";


export const addTodo=async(req,res)=>{

    try {
        
        const newTodo = await todo.create({
            data:req.body.data,
            createdAt:Date.now()
        })
    
        await newTodo.save();
        return res.status(200).json(newTodo)
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const getAllTodos =async (req,res) => {

    try {
        const todos = await todo.find({}).sort({'createdAt':-1})
        return res.status(200).json(todos)

        
    } catch (error) {
        return res.status(500).json(error.message);
    }

}

export const toggleTodoDone =async (req,res) => {

    try {
        const todoref = await todo.findById(req.params.id)
        const toggledtodo= await todo.findOneAndUpdate(
            {_id:req.params.id},
            {done: !todoref.done}
        )
        await toggledtodo.save();
        
        return res.status(200).json(toggledtodo)

        
    } catch (error) {
        return res.status(500).json(error.message);
    }

}

export const updateTodo = async(req,res) => {

    try {
        
        await todo.findOneAndUpdate(
            {_id:req.params.id},
            {data: req.body.text}
        )
        const updatedtodo =await todo.findById(req.params.id)
        
        return res.status(200).json(updatedtodo)

        
    } catch (error) {
        return res.status(500).json(error.message);
    }

}

export const deleteTodo = async(req,res) => {

    try {
        
        const deletedtodo = await todo.findByIdAndDelete(req.params.id)
        
        
        return res.status(200).json(deletedtodo)

        
    } catch (error) {
        return res.status(500).json(error.message);
    }

}