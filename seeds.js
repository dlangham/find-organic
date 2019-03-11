const mongoose      = require('mongoose'),
      Grower        = require('./models/grower'),
      User          = require('./models/user'),
      Comment       = require('./models/comment')
;

const seedUsername = "david";

const seedData = [
    {
        name: 'Overland Organics',
        image: 'killer-tomato-1497481-640x480.jpg',
        description: "Growing 200 varieties of vegetables and fruits."
        ,author: {
            id: null,
            username: null
        }
    },
        {
        name: 'Charismatic Cornucopia',
        image: 'organic-veggie-1538668-640x480.jpg',
        description: "Nature provides all goodness in small packages."
        ,author: {
            id: null,
            username: null
        }
    },
    {
        name: 'Sun-Filled Foods',
        image: 'tomatoes-1327673-640x480.jpg',
        description: 'The sun infuses soulful nutrients into all good food.'
        ,author: {
            id: null,
            username: null
        }
    },
    {
        name: 'Food Loves You',
        image: 'vegetables-1528499-640x480.jpg',
        description: 'Certified organic farm offering variety of veggies.'
        ,author: {
            id: null,
            username: null
        }
    }
];


const seedDB = () => {

    // wipe comments data from db
    Comment.deleteMany({}, (err) => {
        if(err) { console.log(err); }
        else {
            console.log('removed all comments data');
        }
    });

    // wipe growers data from db
    Grower.deleteMany({}, (err) => {
        if(err) { console.log(err); }
        else {
            console.log('removed all growers data');
        }
    });


    // add new seed data plus a comment

    // loop through each seed
    seedData.forEach((seed) => {
        
        User.findOne({/*username: seedUsername*/}, (err, user) => {
            if (err) { console.log(err); }
            else {
                seed.author.id = user.id;
                seed.author.username = user.username;
  
                // now plant each seed data in app
                Grower.create(seed, (err, grower) => {
                    if (err) { console.log(err); }
                    else {
                        console.log('grower added: ' + seed);

                        // now add comment to each seed data
                        Comment.create({
                                text: 'Perfect place to pick a peck of pickled peppers!',
                                author: {
                                    id: user.id,
                                    username: user.username
                                }
                            }, (err, comment) => {
                                if(err) { console.log(err); }
                                else {
                                    grower.comments.push(comment);
                                    grower.save();
                                    console.log('created new comment');
                                }
                        });
                    }
                });
            }
        });
    });
}

module.exports = seedDB;