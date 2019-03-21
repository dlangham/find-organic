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
        description: "Growing 200 varieties of vegetables and fruits. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        ,author: {
            id: null,
            username: null
        }
    },
        {
        name: 'Charismatic Cornucopia',
        image: 'organic-veggie-1538668-640x480.jpg',
        description: "Nature provides all goodness in small packages. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        ,author: {
            id: null,
            username: null
        }
    },
    {
        name: 'Sun-Filled Foods',
        image: 'tomatoes-1327673-640x480.jpg',
        description: 'The sun infuses soulful nutrients into all good food. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        ,author: {
            id: null,
            username: null
        }
    },
    {
        name: 'Food Loves You',
        image: 'vegetables-1528499-640x480.jpg',
        description: 'Certified organic farm offering variety of veggies. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        ,author: {
            id: null,
            username: null
        }
    },
    {
        name: 'Broccoli Heaven',
        image: '8425082435_2c1e938284_o-640x480.jpg',
        description: "So much broccoli, so little time. Yum yum! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        ,author: {
            id: null,
            username: null
        }
    },
        {
        name: 'It\'s Raining Greens',
        image: '2872396423_a792a98008_o-640x480.jpg',
        description: "Plenty of greens for everyone. Come get some!"
        ,author: {
            id: null,
            username: null
        }
    },
    {
        name: 'Organically Delicious',
        image: '8538378880_5cdf0f65eb_o-640x480.jpg',
        description: 'More magical than you\'d expect. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        ,author: {
            id: null,
            username: null
        }
    },
    {
        name: 'Naturally Rooted Organics',
        image: '2910451015_b65f02cc3d_o-640x480.jpg',
        description: 'Roots and tubers are our specialty. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
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