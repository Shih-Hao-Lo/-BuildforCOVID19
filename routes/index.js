const user_ = require('../data/user');
const order_ = require('../data/order');
const map_ = require('../data/map');

const constructorMethod = app => {

    /*

    Homepage

    */

    // app.get('/', async function (req, res) {

    // });


    /*

    User Routers

    */

    app.get('/get_user_by_id', async function (req, res) {
        let userId = req.query.userId;
        try {
            let getUser = await user_.get(userId);
            res.status(200).json(getUser);
        } catch (e) {
            res.status(500).json(e);
        }
    });

    //format:
    // http://localhost:3001/get_user_by_email?email=<email>&Lat=<Lat>&Long=<Long>
    app.get('/get_user_by_email', async function (req, res) {
        let email = req.query.email;
        console.log( parseFloat(req.query.Lat)+','+ parseFloat(req.query.Long))
        try {
            let getByEmail = await user_.getbyemail(email , parseFloat(req.query.Lat) , parseFloat(req.query.Long));
            res.status(200).json(getByEmail);
        } catch (e) {
            res.status(500).json(e);
        }
    });

    app.post('/add_user', async function (req, res) {
        let username = req.body.username;
        let password = req.body.password;
        let Lat = req.body.Lat;
        let Long_ = req.body.Long_;
        let email = req.body.email;
        try {
            let addUser = await user_.adduser(username, password, Lat, Long_, email);
            res.status(200).json(addUser);
        } catch (e) {
            res.status(500).json(e);
        }
    });

    app.put('/update_user', async function (req, res) {
        let userId = req.body.userId;
        let username = req.body.username;
        let password = req.body.password;
        let Lat = req.body.Lat;
        let Long_ = req.body.Long_;
        try {
            let updateUser = await user_.updateuser(userId, username, password, Lat, Long_);
            res.status(200).json(updateUser);
        } catch (e) {
            res.status(500).json(e);
        }
    });

    app.get('/users_near_me', async function (req, res) {
        let km = Number(req.query.range);
        let myLat = Number(req.query.lat);
        let myLong = Number(req.query.long);
        try {
            let usersNearMe = await user_.UsersNearMeByKM(km, myLat, myLong);
            console.log(usersNearMe);
            res.status(200).json(usersNearMe);
        } catch (e) {
            console.log(e)
            res.status(500).json(e);
        }
    });


    /*

    Order Routers

    */

    app.get('/get_all_orders' , async (req , res) => {
        try {
            let query = req.query;
            let allOrders = await order_.getAll(query);
            res.status(200).json(allOrders);
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    });

    app.get('/get_order_by_id/:id', async function (req, res) {
        let orderId = req.params.id;
        try {
            let getOrdersById = await order_.get(orderId);
            res.status(200).json(getOrdersById);
        } catch (e) {
            res.status(500).json(e);
        }
    });

    app.get('/get_orders_by_user', async function (req, res) {
        let userId = req.query.userId;
        try {
            let getOrdersByUser = await order_.getbyuser(userId);
            res.status(200).json(getOrdersByUser);
        } catch (e) {
            res.status(500).json(e);
        }
    });

    app.get('/get_pending_by_user' , async (req , res) => {
        try {
            let pendingbyuser = await order_.getpendingbyuser(req.query.userId);
            res.status(200).json(pendingbyuser)
        } catch(e) {
            res.status(500).json(e)
        }
    });

    app.post('/add_order', async function (req, res) {
        let userId = req.body.userId;
        let prod = req.body.prod;
        let amt = req.body.amt;
        let wish = req.body.wish;
        let wish_amt = req.body.wish_amt;
        let description = req.body.description;
        try {
            let addOrder = await order_.addorders(userId, prod, amt, wish, wish_amt, description);
            res.status(200).json(addOrder);
        } catch (e) {
            res.status(500).json(e);
        }
    });

    app.put('/update_order', async function (req, res) {
        let postId = req.body.postId;
        let prod = req.body.prod;
        let amt = req.body.amt;
        let wish = req.body.wish;
        let wish_amt = req.body.wish_amt;
        try {
            let updatedOrder = await order_.updateorders(postId, prod, amt, wish, wish_amt);
            res.status(200).json(updatedOrder);
        } catch (e) {
            res.status(500).json(e);
        }
    });

    // url samepl: localhost:3001/assign_order_to_user?userId=5e7f9708ba65143aa8a0f13e&orderId=5e7f9708ba65143aa8a0f140
    app.put('/assign_order_to_user', async function(req, res) {
        let userId = req.query.userId;
        let orderId = req.query.orderId;
        try {
            let assignOrder = await order_.AssignOrderToUser(userId, orderId);
            res.status(200).json(assignOrder);
        } catch(e) {
            res.status(500).json(e);
        }
    });


    /*

    Map Routers

    */

    app.get('/top_n_states', async function (req, res) {
        let n = Number(req.query.num);
        try {
            let top_n_states = await map_.TopNState(n);
            console.log(top_n_states);
            res.status(200).json(top_n_states);
        } catch (e) {
            res.status(500).json(e);
        }
    });


    app.get('/virus_near_me', async function (req, res) {
        let km = Number(req.query.range);
        let myLat = Number(req.query.lat);
        let myLong = Number(req.query.long);
        try {
            let virusNearMe = await map_.VirusNearMeByKM(km, myLat, myLong);
            console.log(virusNearMe);
            res.status(200).json(virusNearMe);
        } catch (e) {
            res.status(500).json(e);
        }
    });

}

module.exports = constructorMethod;