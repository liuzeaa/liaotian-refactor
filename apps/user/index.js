var model = require('../../config/model')

const USER = model.User
const connect = model.connect
var express = require('express')

var router = express.Router()

router.get('/',function (req, res) {
    if(req.query.offset && req.query.limit){
        USER.findAll({
            offset:req.query.offset,
            limit:req.query.limit
        }).then(function (users) {
            res.send(users)
        })
    }else {
        USER.findAll().then(function (users) {
            res.send(users)
        })
    }
})

router.get('/:id',function (req, res) {

    USER.findById(req.params.id).then((list)=>{
     res.send(list)
     })
})
router.get('/search',(req,res)=>{
    model.connect.query(`
        SELECT * FROM users FROM username like '%${req.params.username}%'
    `,{model:model.User})
        .then((users)=>{
            res.send(users);
        })
})
router.patch('/:id',(req,res)=>{
    model
        .User.findById(req.params.id)
        .then(item=>{
            item.update(req.body)
                .then(obj=>{
                    res.send(obj);
                })
        })
})
//返回该用户的所有数据
router.get('/:id/detail',function (req, res) {
    USER.findById(req.params.id).then((user)=>{
        connect.query('SELECT * FROM posts WHERE userId = ?',
            {model:model.Post,replacements:[req.params.id]})
            .then((post)=>{
                connect.query('SELECT * FROM users  WHERE id IN (SELECT userId FROM relations WHERE friendId = ?) OR id IN (SELECT friendId FROM relations WHERE userId =?)',
                    {model:model.User,replacements:[req.params.id,req.params.id]})
                    .then((friend)=>{
                        user.dataValues.post = post
                        user.dataValues.friend = friend
                        res.send(user)
                    })
            })
    })
})
router.get('/:id/post',function (req, res) {
    connect.query('SELECT * FROM posts WHERE userId = ?',
        {model:model.Post,replacements:[req.params.id]})
        .then((list)=>{
            res.send(list)
        })

})
router.get('/:id/post_detail',(req,res)=>{
    connect.query(`
        SELECT
        posts.id as id,
        posts.title as title,
        posts.content as content,
        posts.createdAt,
        comments.content as c_content,
        users.username as u_name,
        users.logo as u_logo,
        comments.userId as c_u_id,
        stars.userId as s_u_id
        FROM posts LEFT JOIN comments ON comments.postId = posts.id LEFT JOIN stars ON stars.postId = posts.id
        LEFT JOIN users ON posts.userId = users.id
        WHERE posts.userId IN (SELECT relations.friendId FROM relations WHERE relations.userId=${req.params.id})
        OR posts.userId IN (SELECT relations.userId FROM relations WHERE relations.friendId=${req.params.id})
    `,{
        model:model.Post
    }).then(post=>{
        res.send(post);
    })
})
router.post('/:id/post',(req,res)=>{
    console.log(req.body,'-----')
    model.Post.create({
        userId:req.params.id,
        title:req.body.title,
        content:req.body.content
    }).then((item)=>{
        res.send(item)
    })
})

router.patch('/:userId/post/:postId',(req,res)=>{
    model
        .Post.findById(req.params.postId)
        .then(post=>{
            post.update(req.body)
                .then((item)=>{
                    res.send(item)
                })
        })
})

router.delete('/:userId/post/:postId',(req,res)=>{
    model
        .Post.findById(req.params.postId)
        .then(post=>{
            post.destroy()
                .then((item)=>{
                    res.send(item)
                })
        })

})
router.get('/:id/request',(req,res)=>{
    connect.query(`
    SELECT
    requests.id,
    requests.content,
    users.username AS username,
    users.logo AS logo,
    requests.fromId,
    requests.toId
    FROM requests LEFT JOIN users ON requests.fromId=users.id WHERE toId = ${req.params.id}
`,{model:model.Request}).then((receive)=>{


        connect.query(`
            SELECT
                requests.id,
                requests.content,
                users.username AS username,
                users.logo AS logo,
                requests.fromId,
                requests.toId
            FROM requests LEFT JOIN users ON requests.toId=users.id WHERE fromId = ${req.params.id}

        `,{model:model.Request}).then((send)=>{
            var obj = {}
            obj.send = send
            obj.receive = receive
            res.send(obj)
        })

    })
})




router.get('/:id/friend',function (req, res) {
    connect.query('SELECT * FROM users  WHERE id IN (SELECT userId FROM relations WHERE friendId = ?) OR id IN (SELECT friendId FROM relations WHERE userId =?)',
        {model:model.User,replacements:[req.params.id,req.params.id]})
        .then((list)=>{
            res.send(list)
        })
})



router.post('/:userId/friend/:friendId',(req,res)=>{
    connect.query(
        'INSERT INTO relations (createdAt, updatedAt, userId, friendId) VALUES (NOW(),NOW(),?,?)',
        {replacements:[req.params.userId,req.params.friendId]}
    ).then((item)=>{
        res.send(item)
    })
})
router.delete('/:userId/friend/:friendId',(req,res)=>{
    model.Relation.findOne({
        where:{
            $or:[
                {userId:req.params.userId,friendId:req.params.friendId},
                {friendId:req.params.userId,userId:req.params.friendId}
            ]
        }
    }).then((friend)=>{
        friend.destroy()
            .then((item)=>{
                res.send(item)
            })
    })
})

module.exports = router