const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
let temp_token = '';

//AUTH middleware
const auth = (req, res, next) => {
    console.log('auth_token', req.headers);
    // console.log(req.headers.auth_token);
    let token = temp_token;

    // let temp = getHeader('auth_token');
    // console.log('temp', temp);
    console.log('auth', token);
    if (!token) {
        return res.status(401).send('Access Denied');
    }

    try {
        const verified = jwt.verify(token, 'token_secret');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('INVALID TOKEN');
    }
};

// Register Route
router.post('/register', async (req, res) => {
    // console.log(req.body,"hello");

    // CHECK IF USER ALREADY EXIST IN DB
    const emailExist = await User.find({ email: req.body.email });
    console.log('emailexist', emailExist);
    if (emailExist.length !== 0) {
        console.log('EMAIL already exist');
        return res.status(400).send('Email already exist');
    }

    //HASH password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        events: [],
    });

    // console.log(post);
    try {
        const savedUser = await user.save();
        console.log(savedUser);
        //create Token
        const token = jwt.sign({ _id: user._id }, 'token_secret');
        res.setHeader('auth_token', token);
        temp_token = token;
        res.send({ user: user._id }); // RESPONSE FOR CONSOLE
    } catch (err) {
        res.status(400).json({ message: err }); // RESPONSE FOR CONSOLE
    }
});

//Login Route
router.post('/login', async (req, res) => {
    //Checking if email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        console.log('email does not exist');
        return res.status(400).send('Email does not exist');
    }

    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!validPassword) {
        console.log('Invalid password');
        return res.status(400).send('INVALID PASSWORD');
    }
    //create Token
    const token = jwt.sign({ _id: user._id }, 'token_secret');
    res.setHeader('auth_token', token);
    temp_token = token;

    console.log('get', token);
    res.send();
});

// // POST route
// router.post('/', async (req, res) => {
//     // console.log(req.body,"hello");

//     const post = new User({
//         title: req.body.title,
//         body: req.body.body,
//         author: req.body.author,
//     });

//     // console.log(post);
//     try {
//         const savedPost = await post.save();
//         // console.log(savedPost);
//         res.json(savedPost); // RESPONSE FOR CONSOLE
//     } catch (err) {
//         res.json({ message: err }); // RESPONSE FOR CONSOLE
//     }
// });

// GET All Posts
router.get('/', auth, async (req, res) => {
    try {
        console.log(req.user);
        const data = await User.find({ _id: req.user._id });
        res.json(data); // RESPONSE FOR CONSOLE
    } catch (err) {
        res.json({ message: err }); // RESPONSE FOR CONSOLE
    }
});

// // FIND SPECIFIC POST
// router.get('/:postId', async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.postId);
//         res.json(post);
//     } catch (err) {
//         res.json({ message: err });
//     }
// });

// //DELETE POST
// router.delete('/', async (req, res) => {
//     try {
//         const deletedPost = await User.deleteOne({ _id: req.user._id });
//         res.json(deletedPost);
//     } catch (err) {
//         res.json({ message: err });
//     }
// });

router.patch('/delete', auth, async (req, res) => {
    try {
        console.log(req.user);
        const data = await User.find({ _id: req.user._id });
        console.log(req.body);
        // event_temp_data.push(event_teamp_data);
        let temp_return_data = [];
        let temp_event = data[0].events;
        temp_event.forEach((ele) => {
            // if (ele.event_id !== req.body.event_id) {
            //     temp_return_data.push(ele);
            // }
            console.log('ele', ele);
        });
        console.log('temp_event', temp_return_event);
        // temp_event.push(temp_data);
        // try {
        //     const updatedPost = await User.updateOne(
        //         { _id: req.user._id },
        //         {
        //             $set: {
        //                 events: temp_event,
        //             },
        //         }
        //     );
        //     res.json(updatedPost);
        // } catch (err) {
        //     res.json({ message: err });
        // }

        res.json(data);
    } catch (err) {
        res.json({ message: err }); // RESPONSE FOR CONSOLE
    }
});

//UPDATE POST
router.patch('/', auth, async (req, res) => {
    try {
        console.log(req.user);
        const data = await User.find({ _id: req.user._id });
        // console.log(data[0].events);
        // event_temp_data.push(event_teamp_data);
        let event_id = Math.random() * 1000;
        let temp_data = {
            event_id: event_id,
            title: req.body.title,
            body: req.body.body,
            author: req.body.author,
        };
        let temp_event = data[0].events;
        temp_event.push(temp_data);
        console.log(temp_event);
        try {
            const updatedPost = await User.updateOne(
                { _id: req.user._id },
                {
                    $set: {
                        events: temp_event,
                    },
                }
            );
            res.json(updatedPost);
        } catch (err) {
            res.json({ message: err });
        }

        // res.json(data);
    } catch (err) {
        res.json({ message: err }); // RESPONSE FOR CONSOLE
    }
});

module.exports = router;
