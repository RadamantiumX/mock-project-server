import { Router } from "express"
import rescue from "express-rescue"
import postController from "../controllers/post.controller"

const postRouter = Router()

postRouter.route('/post').post(rescue(postController.post))
postRouter.route('/response-post').post(rescue(postController.responsePost))
postRouter.route('/delete-post').delete(rescue(postController.deletePost))

export default postRouter
