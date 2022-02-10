const {Router}=require('express')
const router= Router()
const Admins=require('../modules/admins/route')
const Posts=require('../modules/posts/route')
const Categories=require('../modules/categories/route')
const Users=require('../modules/users/route')

router.use('/admin',Admins)
router.use('/posts',Posts)
router.use('/categories',Categories)
router.use('/',Users)

module.exports=router